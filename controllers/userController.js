import { User } from "../models/user.js";
import bcrypt from "bcryptjs";




export const registerUser = async(req , res)=>{

    // waxa user laga qoda xogta
    const {name , email, password} = req.body;

    try {
    // xogta laga so qady userka la hubina inu userka jiro

    const userExsist = await User.findOne({email})

    if (userExsist) return res.status(400).json({message: "user already exist"})

    // passwordka la hash gareyna

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    // user create gareyna in database

    const savedUser = await User.create({
        name,
        email,
        password:hashedPassword,
    })


    // token la generate gareyna

    res.status(201).json({
        status:"success",
        data: savedUser
    })
    } catch (error) {
        console.log(error);
        
        
    }
}