import express from "express";

const router = express.Router();

import {
  register,
  login,
  updateUser,
  partialUpdateUser
} from "../controllers/user.controller.js";
;
// Auth
router.post("/register", register);
router.post("/login", login);

// User
router.put("/users/:id", updateUser);
router.patch("/users/:id", partialUpdateUser);

export default router;












