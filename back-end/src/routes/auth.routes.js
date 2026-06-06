import express from "express";

const authRouter = express.Router();

import { createAccount } from "../controllers/auth/signup/createAccount.js";
// import { Login } from "../controllers/auth/Login.js";


// Auth
authRouter.post("/sign-up", createAccount);
// router.post("/login", Login);


export default authRouter;


  