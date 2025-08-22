import UserModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import BlacklistTokenModel from "../models/blackList.token.model.js";

// Register User
export const registerUser = async (req, res, next) => {
  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const hashedPassword = await UserModel.hashPassword(password);

  const user = await createUser({
    firstName: fullname.firstName,
    lastName: fullname.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(201).json({ token, user });
};

// Login User
export const loginUser = async (req, res, next) => {
  const errors = validationResult(res);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = user.generateAuthToken();
  
  res.cookie("token", token);

  res.status(201).json({ token, user });
};

// Get User Profile
export const getUserProfile = async (req, res, next) => {
  res.status(201).json(req.user);
};

// Logout User
export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers["authorization"].split(" ")[1];

  await BlacklistTokenModel.create({ token });

  res.status(201).json({ message: "Logout successful." });
};
