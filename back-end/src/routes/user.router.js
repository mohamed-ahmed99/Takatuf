import express from "express";

const router = express.Router();

import {register} from "../controllers/signup.controller.js";
import {login} from "../controllers/login.controller.js";


// Auth
router.post("/register", register);
router.post("/login", login);


export default router;


  