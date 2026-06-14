import express from "express";
import { createAccount } from "../controllers/auth/createAccount.js";
import { login } from "../controllers/auth/login.js";

// middleware
import upload from "../middlewares/upload.middleware.js";

// fields for upload on sign-up route
import { requestedFields } from "../controllers/auth/createAccount.js";


const authRouter = express.Router();


/////////////////// routes
// Auth
authRouter.post("/sign-up", upload.fields(requestedFields), createAccount);

authRouter.post("/log-in", login);


export default authRouter;


  