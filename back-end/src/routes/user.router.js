import express from "express";

const router = express.Router();

import {
  register,
  login,
  logout,
  getProfile
} from "../controllers/user.controller.js";
;
// Auth
router.post("/register", register);
router.get("/",getProfile);
router.post("/login", login);
router.post("/logout", logout);

// User
router.get("/profile", verifyToken, getProfile);

export default router;

