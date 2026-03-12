import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../token/generatetoken.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  // waxa user laga qoda xogta
  const { name, email, password ,role} = req.body;

  try {
    // xogta laga so qady userka la hubina inu userka jiro

    const userExsist = await User.findOne({ email });

    if (userExsist)
      return res.status(400).json({ message: "user already exist" });

    // passwordka la hash gareyna

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // user create gareyna in database

    const savedUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // token la generate gareyna
    const token = generateToken(savedUser);

    res.status(201).json({
      status: "success",
      data: savedUser,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checking if the user exsist by email

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "user not found" });

    // password comparing and checking

    const ispasswordCorrect = await bcrypt.compare(password, user.password);

    if (!ispasswordCorrect)
      return res.status(400).json({ message: "password is incorrrect" });

    // Generate token

    // const token = generateToken(user)

    // console.log(token);

    // const token = jwt.sign(
    //     {id:user.id},
    //     process.env.JWT_SECRET,
    //     {expiresIn:process.env.JWT_EXPIREIN}
    // )
    //  console.log(token);

    res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

export const updateUser = async (req, res) => {
  // waxa laga so qada ID giisa

  const id = req.params.id;

  const { name, email, password } = req.body;

  try {
    const user = await User.findById(id);

    // checking if the user exsist

    if (!user) return res.status(400).json({ message: "user not found" });

    user.name = name;
    user.email = email;
    user.password = password;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "user updated",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
