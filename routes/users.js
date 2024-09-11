import express from "express";
import { getAllUsers, updateUserProfile } from "../controllers/index.js";
import { authenticateToken, authorizeAdmin } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAllUsers);
router.put("/profile", authenticateToken, updateUserProfile);

export default router;
