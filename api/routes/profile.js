import express from "express";
import { getUserProfile } from "../controllers/profile.js"; // Import the controller function

const router = express.Router();

// Route to get a user profile by ID
router.get("/:id", getUserProfile);

export default router;
