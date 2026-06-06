import express from "express";

const router = express.Router();

import { Signup } from "../controllers/auth/Signup.js";
import { Login } from "../controllers/auth/Login.js";


// Auth
router.post("/register", Signup);
router.post("/login", Login);


export default router;


  