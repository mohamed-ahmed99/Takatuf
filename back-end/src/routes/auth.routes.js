import express from "express";

const authRouter = express.Router();

import { createAccount } from "../controllers/auth/signup/createAccount.js";
// import { Login } from "../controllers/auth/Login.js";

// middleware
import upload from "../middlewares/upload.middleware.js";

// fields for upload on sign-up route
import { requestedFields } from "../controllers/auth/signup/createAccount.js";


// Auth
authRouter.post("/sign-up", upload.fields(requestedFields), createAccount);

// router.post("/login", Login);


export default authRouter;


  