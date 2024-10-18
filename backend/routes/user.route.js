import express from "express";
import {login, Signup,logout,allUsers,} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router=express.Router()
router.post("/signup", Signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allUsers",secureRoute, allUsers);









export default router;