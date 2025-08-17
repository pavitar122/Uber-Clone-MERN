import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";
import captainModel from "../models/captain.model.js";

export const registerCaptain = async (req, res, next) => {
  try {
    // 🔹 Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // 🔹 Create captain (password will be hashed automatically in pre-save hook)
    const captain = await createCaptain({
      firstName: fullname.firstName,
      lastName: fullname.lastName || "",
      email,
      password,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    // 🔹 Generate token
    const token = captain.generateAuthToken();

    // 🔹 Set token in cookie
    res.cookie("token", token, { httpOnly: true, secure: false });

    return res.status(201).json({ token, captain });
  } catch (err) {
    next(err); // let error middleware handle it
  }
};

export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

export const getCaptainProfile = async (req, res, next) => {
  res.status(201).json(req.captain);
};

export const logoutCaptain = async (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  res.clearCookie("token");

  await BlacklistTokenModel.create({ token });

  res.status(201).json({ message: "Logout successful." });
};
