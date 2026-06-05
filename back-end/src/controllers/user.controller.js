import usermodel from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

const register = asyncHandler(async (req, res) => {
    const { fullName, email, password, role } = req.body
    // validate
    if (!fullName || !email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all required fields.',
            data: null
        })
    }
    // check if user exists
    const existUser = await usermodel.findOne({ email })
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
    const user = await usermodel.create({
        fullName,
        email,
        password: hashedPassword,
        role
    })

    res.status(201).json({
        status: 'success',
        message: 'User registered successfully.',
        data: {
            id: user._id,
            email: user.email
        }
    })
})

export default register

