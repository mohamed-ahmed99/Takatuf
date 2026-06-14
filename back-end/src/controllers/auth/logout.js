import asyncHandler from "express-async-handler"
import Sessions from "../../models/session.model.js"

export const logout = asyncHandler(async (req, res) => {
    // get token from cookies
    const userId = req.user._id
    const token = req.cookies.TakatufAuth
    const target = req.query.target || "me"

    let resMSG = ""

    // logout from current session
    if(target === "me") {
        if (token) {
            // find session and mark it as revoked
            await Sessions.findOneAndUpdate(
                { token },
                { 
                    status: "revoked", 
                    revokedReason: "user logged out" 
                }
            )
            resMSG = "Logged out successfully"
        }
    } 
    // logout from all sessions
    else if(target === "all") {
        await Sessions.updateMany(
            { user: userId, status: "active" },
            { 
                status: "revoked", 
                revokedReason: "user logged out from all sessions" 
            }
        )
        resMSG = "Logged out from all sessions successfully"
    }
    // logout from all sessions except current (others)
    else if(target === "others") {
        await Sessions.updateMany(
            { user: userId, token: { $ne: token }, status: "active" },
            { 
                status: "revoked", 
                revokedReason: "user logged out from other sessions" 
            }
        )
        resMSG = "Logged out from all other sessions successfully"
    }
    else {
       return res.status(400).json({
            status: "fail",
            message: "Invalid target"
        })
    }

    // clear the authentication cookie
    res.clearCookie("TakatufAuth", {
        path: "/"
    })

    res.status(200).json({
        status: "success",
        message: resMSG
    })
})
