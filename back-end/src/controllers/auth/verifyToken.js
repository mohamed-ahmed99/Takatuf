import accountModel from "../../models/account.model.js"
import asyncHandler from "express-async-handler"

// verify-me 
export const verifyMe = asyncHandler(async (req, res) => {
    // check if user id exists from verifyToken middleware
    if (!req.user?._id) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    // get account from dataBase
    const account = await accountModel.findById(req.user._id)

    // check if account not found
    if (!account) {
        return res.status(404).json({ status: "fail", message: "User not found" });
    }

    // check if user is active or unverified
    const accountStatus = account.status
    if (accountStatus !== "active" && accountStatus !== "unverified") {
        return res.status(401).json({ status: "fail", message: `Unauthorized. Your account is ${accountStatus}.` });
    }

    // response payload
    const userData = {
        _id: account._id,
        role: account.role,
        status: account.status,
        email: account.email,
        accountType: account.accountType
    };

    return res.status(200).json({
        status: "success",
        message: "User verified successfully",
        data: {
            user: userData
        }
    });
})

export default verifyMe