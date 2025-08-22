import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRouter);
app.use("/captains", captainRouter);

export default app;
