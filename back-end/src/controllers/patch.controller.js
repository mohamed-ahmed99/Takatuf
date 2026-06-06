import usermodel from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

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




