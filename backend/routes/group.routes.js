import express from "express";
import { createGroup, getUserGroups, addMember } from "../controllers/group.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

// Create a new group
router.post("/create", secureRoute, createGroup);

// Get all groups of the logged-in user
router.get("/", secureRoute, getUserGroups);

// Add a new member to a group
router.post("/add-member", secureRoute, addMember);

export default router;
