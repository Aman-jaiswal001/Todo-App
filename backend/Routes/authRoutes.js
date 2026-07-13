import express from "express";
import { login, register } from "../controllers/authController.js";

const authRouter = express.Router();

// Register User
authRouter.post("/register", register);

// Login User
authRouter.post("/login", login);

export default authRouter;