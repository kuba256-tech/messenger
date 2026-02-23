import express from "express";
import { checkAuth, logout, signin, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", logout);

authRouter.post("update-profile", protectRoute, updateProfile)
authRouter.get("/check", protectRoute, checkAuth)

export default authRouter;
