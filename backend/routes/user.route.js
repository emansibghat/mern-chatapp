import express from "express";
import { login, Signup, logout, allUsers, searchUserByEmail, getUserConversations } from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();
router.post("/signup", Signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers", secureRoute, allUsers);
router.get("/search/:email", secureRoute, searchUserByEmail);
router.get("/conversation/:userId", secureRoute, getUserConversations);

export default router;