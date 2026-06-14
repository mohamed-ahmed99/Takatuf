import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import accountModel from '../../models/account.model.js'
import Sessions from '../../models/session.model.js'
import dotenv from 'dotenv'

dotenv.config()

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // 1. check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ status: "fail", message: "Please provide email and password" })
    }

    // 2. find account by email
    const account = await accountModel
        .findOne({ email }).sort({ createdAt: -1 }).select("+password")

    // 3. check if account exists
    if (!account) {
        return res.status(401).json({ status: "fail", message: "Invalid email or password" })
    }

    // 4. check account status
    if (account.status === "unverified") {
        return res.status(401).json({
            status: "fail",
            action: "verify_email",
            message: "This account is not verified. Please verify your email first."
        })
    }
    else if (["banned", "deleted"].includes(account.status)) {
        return res.status(403).json({ status: "fail", message: `This account has been ${account.status}.` })
    }
    else if (!["active", "unverified", "banned", "deleted"].includes(account.status)) {
        return res.status(500).json({ status: "fail", message: "Something went wrong!" })
    }

    // 5. compare password
    const isPasswordMatch = await bcrypt.compare(password, account.password)
    if (!isPasswordMatch) {
        return res.status(401).json({ status: "fail", message: "Invalid email or password" })
    }

    // 6. generate JWT token
    const token = jwt.sign(
        { _id: account._id, role: account.role, accountType: account.accountType },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    )

    // 7. create session
    await Sessions.create({
        user: account._id,
        token: token,
        ip: req.ip,
        userAgent: req.get("user-agent"),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    })

    // 8. set cookie
    const isProduction = process.env.NODE_ENV === "production"
    res.cookie("TakatufAuth", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    // 9. return response
    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        data: {
            _id: account._id,
            email: account.email,
            role: account.role,
            accountType: account.accountType
        }
    })
})
