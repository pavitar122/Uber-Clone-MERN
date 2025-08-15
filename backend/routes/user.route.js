import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("fullname.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  loginUser
);


export default router;
