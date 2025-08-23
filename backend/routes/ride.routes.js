import express from "express";
import { body, query } from "express-validator";
import {
  createRide,
  getFare,
  confirmRide,
  endRide,
  startRide,
} from "../controllers/ride.controller.js";
import { authUser, authCaptain } from "../middleware/auth.middleware.js";

const rideRouter = express.Router();

rideRouter.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  createRide
);

rideRouter.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  getFare
);

rideRouter.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRide
);

rideRouter.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide
);

rideRouter.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide
);

export default rideRouter;
