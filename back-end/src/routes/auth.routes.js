import express from "express";
import { createAccount } from "../controllers/auth/createAccount.js";
import { login } from "../controllers/auth/login.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { verifyMe } from "../controllers/auth/verifyToken.js";

// middleware
import upload from "../middlewares/upload.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.js";

// fields for upload on sign-up route
import { requestedFields } from "../controllers/auth/createAccount.js";


const authRouter = express.Router();


/////////////////// routes

// create account
authRouter.post("/sign-up", upload.fields(requestedFields), createAccount);

// log in 
authRouter.post("/log-in", login);

// verify email
authRouter.post("/verify-email", verifyToken("TakatufAuth"), verifyEmail);

authRouter.get("/verify-token", verifyToken("TakatufAuth"), verifyMe);

export default authRouter;


  