import jwt from "jsonwebtoken"

export const generateToken = (user)=>{
    const payload = { _id: user._id, role: user.role };

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIREIN
    }); 

    return token
}