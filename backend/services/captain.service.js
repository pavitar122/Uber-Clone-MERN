import CaptainModel from "../models/captain.model.js";

export const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  // 🔹 Validate required fields
  if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All fields are required.");
  }

  // 🔹 Check if captain already exists
  const existingCaptain = await CaptainModel.findOne({ email });
  if (existingCaptain) {
    throw new Error("Email already exists.");
  }

  // 🔹 Create new captain
  const captain = await CaptainModel.create({
    fullname: { firstName, lastName },
    email,
    password, 
    vehicle: { color, plate, capacity, vehicleType },
  });

  return captain;
};
