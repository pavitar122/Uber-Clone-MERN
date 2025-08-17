import express from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controller.js";

const captainRouter = express.Router();

captainRouter.post(
  "/register",
  [
    body("fullname.firstName")
      .trim()
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),

    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("vehicle.color")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters"),

    body("vehicle.plate")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3 characters"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),

    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);

export default captainRouter;
