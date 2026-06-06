import usermodel from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

 export const register = asyncHandler(async (req, res) => {
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

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { fullName, email, password, role, status, isVerified } = req.body

    if (!fullName || !email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all required fields.',
            data: null
        })
    }

    const user = await usermodel.findById(id)
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found.',
            data: null
        })
    }

    const existingUser = await usermodel.findOne({ email, _id: { $ne: id } })
    if (existingUser) {
        return res.status(400).json({
            status: 'fail',
            message: 'Email already exists.',
            data: null
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.fullName = fullName
    user.email = email
    user.password = hashedPassword
    if (role !== undefined) user.role = role
    if (status !== undefined) user.status = status
    if (isVerified !== undefined) user.isVerified = isVerified

    const updatedUser = await user.save()

    return res.status(200).json({
        status: 'success',
        message: 'User updated successfully.',
        data: {
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status,
            isVerified: updatedUser.isVerified
        }
    })
})

export const partialUpdateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    const updates = { ...req.body }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide data to update.',
            data: null
        })
    }

    const user = await usermodel.findById(id)
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found.',
            data: null
        })
    }

    if (updates.email) {
        const existingUser = await usermodel.findOne({ email: updates.email, _id: { $ne: id } })
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists.',
                data: null
            })
        }
        user.email = updates.email
    }

    if (updates.fullName) user.fullName = updates.fullName
    if (updates.password) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(updates.password, salt)
    }
    if (updates.role !== undefined) user.role = updates.role
    if (updates.status !== undefined) user.status = updates.status
    if (updates.isVerified !== undefined) user.isVerified = updates.isVerified

    const updatedUser = await user.save()

    return res.status(200).json({
        status: 'success',
        message: 'User updated successfully.',
        data: {
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            status: updatedUser.status,
            isVerified: updatedUser.isVerified
        }
    })
})



