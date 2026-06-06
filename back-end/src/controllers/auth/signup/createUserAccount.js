import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import accountModel from '../../../models/account.model.js'


export const createUserAccount = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body
    
    // check if user exists
    const existUser = await userModel.findOne({ email })
    if (existUser) {
        return res.status(400).json({
            status: 'fail',
            message: 'Email already exists.',
            data: null
        })
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        gender,
        location,
        accountType
    })
    // token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
    // cookie
 res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true في production (https)
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
        status: 'success',
        message: 'User registered successfully.',
        data: {
            id: user._id,
            email: user.email,
            token // optional
        }
    })
})