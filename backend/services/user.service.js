import UserModel from "../models/user.model.js";

export const createUser = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !email || !password) {
    throw new Error("All the fields are required.");
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
