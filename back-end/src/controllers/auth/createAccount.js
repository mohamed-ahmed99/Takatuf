import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import emailTransporter from '../../config/emailTransporter.js'
import { verifyEmailMSG } from '../../utils/verifyEmailMSG.js'
import { uploadToCloudinary } from '../../utils/uploadToCloudinary.js'

// models 
import Sessions from "../../models/session.model.js"
import userModel from '../../models/profiles/user.model.js'
import charityVerificationModel from '../../models/profiles/CharityVerification.model.js'
import charityModel from '../../models/profiles/charity.model.js'
import accountModel from '../../models/account.model.js'

// 
dotenv.config()


// fields for upload on sign-up route
export const requestedFields = [
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "document", maxCount: 1 }
]


export const createAccount = asyncHandler(async (req, res) => {

    // check if this email connected with an active account or not
    const account = await accountModel
        .findOne({ email: req.body.email })
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
            return res.status(400).json({
                status: "fail",
                action: "verify_email",
                message: "This email is connected with an unverified account, please verify this email or wait for 10 minutes to try again",
            })
        }
    }


    // check required files
    const profileImage = req.files?.profileImage ? req.files.profileImage[0] : null
    const coverImage = req.files?.coverImage ? req.files.coverImage[0] : null
    const document = req.files?.document ? req.files.document[0] : null

    // upload profile and cover images
    const uploadedProfileImage = await uploadToCloudinary(profileImage.buffer, "profileImages")
    const uploadedCoverImage = await uploadToCloudinary(coverImage.buffer, "coverImages")

    // upload document if the accountType === "charity"
    let uploadedDocument = null
    if (req.body.accountType === "charity") {
        uploadedDocument = await uploadToCloudinary(document.buffer, "documents")
    }

    // hash password, create verification code
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const verificationCode = Math.floor(Math.random() * 900000 + 100000).toString()

    // create account
    const newAccount = await accountModel.create({
        email: req.body.email,
        password: hashedPassword,
        accountType: req.body.accountType,
        verification: { verificationCode },
    })

    // create profile of account
    if (req.body.accountType === "user") {
        await userModel.create({
            accountId: newAccount._id, // reference
            fullName: req.body.fullName, // full name
            phoneNumber: req.body.phoneNumber, // phone number
            dateOfBirth: req.body.dateOfBirth, // date of birth
            gender: req.body.gender === "ذكر" || "male" ? "male" : "female", // gender
            address: {
                governorate: req.body.governorate, // governorate
                city: req.body.city, // city
                district: req.body.district || null, // district
            },
            // images
            profileImage: {url: uploadedProfileImage.url, id: uploadedProfileImage.public_id}, // profile image
            coverImage: {url: uploadedCoverImage.url, id: uploadedCoverImage.public_id}, // cover image
        })
    }
    // create charity profile 
    else if (req.body.accountType === "charity") {

        // create charity profile
        await charityModel.create({
            accountId: newAccount._id, // reference
            charityName: req.body.charityName, // charity name
            about: req.body.about || null, // about
            establishmentDate: req.body.establishmentDate, // establishment date
            address: {
                governorate: req.body.governorate, // governorate
                city: req.body.city, // city
                district: req.body.district || null, // district
            },
            contactInfo: {
                email: req.body.charityEmail || req.body.email, // email
                phone: req.body.charityPhone || req.body.phone, // phone
                socialMedia: req.body.socialMedia || []
            },
            // images
            profileImage: {url: uploadedProfileImage?.url || null, id: uploadedProfileImage?.public_id || null}, // profile image
            coverImage: {url: uploadedCoverImage?.url || null, id: uploadedCoverImage?.public_id || null}, // cover image
        })

        // create verification account for charity
        await charityVerificationModel.create({
            accountId: newAccount._id, // reference
            representative: {
                fullName: req.body.fullName, // full name
                nationalId: req.body.nationalId, // national id
                phone: req.body.phone, // phone number
                email: req.body.email, // email
                position: req.body.position, // position
            },
            legalInfo: {
                registrationNumber: req.body.registrationNumber, // registration number
                taxNumber: req.body.taxNumber, // tax number
                verificationDocument: {url: uploadedDocument.url, id: uploadedDocument.public_id}, // verification document
            },
        })
    }

    // send code to user
    try {
        await emailTransporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: req.body.email,
            subject: "Verify Your Account",
            html: verifyEmailMSG(`${newAccount.fullName}`, verificationCode)
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "fail", message: "Failed to send verification email" })
    }

    // create token for verify email
    const token = jwt.sign(
        { _id: newAccount._id, email: newAccount.email },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
    )

    // cookie for verify email
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("TakatufAuth", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "None",
        path: "/",
        maxAge: 10 * 60 * 1000, // 10 minutes
    });

    // create session
    await Sessions.create({ 
        user: newAccount._id, // reference
        token, // token
        ip: req.ip, // ip address
        userAgent: req.get("user-agent"), // user agent
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    })

    // response
    res.status(201).json({
        status: "success",
        message: "successful registration, check your email",
        action: "verify_email"
    })
})

