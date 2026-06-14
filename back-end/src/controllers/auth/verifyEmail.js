import asyncHandler from 'express-async-handler'
import jwt from "jsonwebtoken"
import accountModel from '../../models/account.model.js'
import Sessions from '../../models/session.model.js'
import dotenv from 'dotenv'

dotenv.config()

export const verifyEmail = asyncHandler(async (req, res) => {
    const { code } = req.body
    
    // Try to get email from req.user (if passed via verifyToken middleware) or req.body
    const email = req.user?.email || req.body.email

    // check code from body
    if (!code) {
        return res.status(400).json({ status: "fail", message: "Verification code is required" })
    }

    // check if user in database
    const account = await accountModel.findOne({ email }).sort({ createdAt: -1 })
    if (!account) {
        return res.status(404).json({ status: "fail", message: "Account not found. Please check your email or create a new account." })
    }

    // check if user is already verified
    if (account.status !== "unverified") {
        return res.status(400).json({ status: "fail", message: `This email is already ${account.status}.` })
    }

    // check if code is correct
    if (account.verification.verificationCode !== code) {
        return res.status(400).json({ status: "fail", message: "Incorrect verification code." })
    }

    // Generate new token
    const token = jwt.sign(
        { _id: account._id, email: account.email, role: account.role, accountType: account.accountType }, 
        process.env.JWT_SECRET, 
        { expiresIn: "30d" }
    )

    // clear the temporary cookie if it exists
    res.clearCookie("TakatufAuth")

    // create new session
    await Sessions.create({
        user: account._id,
        token,
        ip: req.ip,
        userAgent: req.get("user-agent"),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
    })

    // update DB
    account.status = "active"
    // account.verification.verificationCode = null;
    // account.verification.expiresAt = null;
    account.set("verification", undefined);
    await account.save()    

    // set new production cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("TakatufAuth", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    // response
    return res.status(200).json({
        status: "success",
        message: "Email verified successfully",
        data: {
            _id: account._id,
            email: account.email,
            role: account.role,
            accountType: account.accountType,
            status: account.status
        }
    });
})

export default verifyEmail