import express from "express";
import * as UserController from "../controllers/UserController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { loginValidation, registerValidation } from "../validations.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
router.get("/me", checkAuth, UserController.getMe);

export default router;
