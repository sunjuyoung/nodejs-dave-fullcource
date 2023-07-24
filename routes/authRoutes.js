import express from "express";
const router = express.Router();
import loginLimiter from "../middleware/loginLimiter.js";
import { login, logout, refresh } from "../controllers/authController.js";

router.route("/").post(loginLimiter, login);

router.route("/refresh").get(refresh);

router.route("/logout").post(logout);

export default router;
