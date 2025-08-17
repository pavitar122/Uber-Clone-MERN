import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";

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
