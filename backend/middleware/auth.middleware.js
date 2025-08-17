import UserModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlacklistTokenModel from "../models/blackList.token.model.js";

export const authUser = async (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const isBlackListed = await BlacklistTokenModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  
  try {
    const decoded_id = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded_id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};


export const authCaptain = async (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const isBlackListed = await BlacklistTokenModel.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  
  try {
    const decoded_id = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded_id);
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};

