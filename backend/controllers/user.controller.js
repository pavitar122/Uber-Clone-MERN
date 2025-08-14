import UserModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";

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

  res.status(201).json({ token, user });
};
