import UserModel from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw new Error("All the fields are required.");
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const user = UserModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
};
