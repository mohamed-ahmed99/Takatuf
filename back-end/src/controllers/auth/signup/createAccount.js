import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import accountModel from '../../../models/account.model.js'
import dotenv from 'dotenv'
import emailTransporter from '../../../config/emailTransporter.js' 
import { verifyEmailMSG } from '../../../utils/verifyEmailMSG.js'

dotenv.config()


export const createAccount = asyncHandler(async (req, res) => {

    // check if this email connected with an active account or not
    const account = await accountModel
        .findOne({ email: req.body.account.email })
        .sort({ createdAt: -1 })

    // if there is an account connected with this email
    if (account) {
        // if active
        if (account.status === "active") {
            return res.status(400).json({ status: "fail", message: "This email is already connected with an active account" })
        }
        // if banned
        else if (account.status === "banned") {
            return res.status(400).json({ status: "fail", message: "This email is banned" })
        }
        // if unverified
        else if (account.status === "unverified" && account.verification.expiresAt > Date.now()) {
            return res.status(400).json({ status: "fail", message: "This email is connected with an unverified account, please verify this email or wait for 10 minutes to try again" })
        }
    }

    // hash password, create verification code
    const hashedPassword = await bcrypt.hash(req.body.account.password, 10)
    const verificationCode = Math.floor(Math.random() * 900000 + 100000).toString()

    // create account
    const newAccount = await accountModel.create({ 
        fullName: req.body.account.fullName,
        email: req.body.account.email,
        password: hashedPassword,
        role: req.body.account.role,
        accountType: req.body.account.accountType,
        verification: { verificationCode } 
    })

    // create profile of account


    // send code to user
    try {
        await emailTransporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: req.body.account.email,
            subject: "Verify Your Account",
            html: verifyEmailMSG(`${newAccount.fullName}`, verificationCode)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "fail", message: "Failed to send verification email" })
    }
    
    // create token for verify email
    const token = jwt.sign({ _id: newAccount._id, email: newAccount.email }, process.env.JWT_SECRET, { expiresIn: "10m" })

    // cookie for verify email
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("TakaTufVerifyEmailAuth", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "None",
        path: "/",
        maxAge: 10 * 60 * 1000, // 10 minutes
    });

    // create session
    // await Sessions.create({ user: newAccount._id, token, ip: req.ip, expiresAt: new Date(Date.now() + 1000 * 60 * 10) })

    // response
    res.status(201).json({ 
        status: "success",
        message: "successful registration, check your email" 
    })
})










