
import usermodel from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password.',
            data: null
        })
    }

    const user = await usermodel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email or password.',
            data: null
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid email or password.',
            data: null
        })
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true في production (https)
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        status: 'success',
        message: 'User logged in successfully.',
        data: {
            id: user._id,
            email: user.email,
            token
        }
    })
})

