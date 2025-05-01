import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import userModel from "../models/userModel.js";

const Loginuser = async (req,res) => {
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            return res.json({success:false,message:"Email or Password Required"})
        }
        const existingUser = await userModel.findOne({email});
        if (!existingUser) {
            return res.json({success:false,message:"User does't exist"})
        }
        const isMatch = await bcrypt.compare(password,existingUser.password);
        if (!isMatch) {
            return res.json({success:false,message:"Invalid Credentails"}) 
        }
        const token = jwt.sign({_id:existingUser._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.json({success:true,existingUser:{email:existingUser.email , name:existingUser.name}})   
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.error("Err", error.message);
    }
}


const registerUser = async (req,res) => {
    try {
        const {name,password,email} = req.body;
    
    if (!name || !password || !email) {
        return res.json({success:false,message:"Name or Email or Password Required"})
    }
    const existingUser = await userModel.findOne({email});
    if (existingUser) {
        return res.json({success:false,message:"user already Exist"})
    }
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:"Please enter valid email"})
    }
    if (password.length < 8) {
        return res.json({success:false,message:"Password must be at least of 8 characters"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const userData = await userModel.create({name,email,password:hashedPassword});
    const token = jwt.sign({_id: userData._id}, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.json({ success: true, message:success.message, userData: { email: userData.email, name: userData.name } });
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.error("Err", error.message);
    }
}
export {Loginuser,registerUser}