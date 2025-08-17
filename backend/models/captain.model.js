import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const captainSchema = new mongoose.Schema({
  fullname: {
    firstName: { type: String, required: true, minlength: 3 },
    lastName: { type: String },
  },
  email: { type: String, required: true, unique: true, minlength: 5 },
  password: { type: String, required: true, select: false },
  socketId: String,
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },

  vehicle: {
    color: { type: String, required: true },
    plate: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "auto"],
      required: true,
    },
  },

  location: {
    lat: Number,
    lng: Number,
  },
});

// 🔹 Hash password before saving
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Compare password
captainSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// 🔹 Generate JWT
captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

export default mongoose.model("Captain", captainSchema);
