import express from "express";
import { query } from "express-validator";
import { authUser } from "../middleware/auth.middleware.js";
import {
  getCoordinates,
  getDistanceTimeController,
  getAutoCompleteSuggestionsController,
} from "../controllers/map.controller.js";

const mapRouter = express.Router();

mapRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

mapRouter.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTimeController
);

mapRouter.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestionsController
);

export default mapRouter;
