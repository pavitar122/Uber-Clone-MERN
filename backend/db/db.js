import mongoose from "mongoose";

function connectToDB(url) {
  mongoose
    .connect(url)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

export default connectToDB;
