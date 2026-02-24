import express from "express"
import { protectRoute } from "../middleware/protectRoute.js";
import { getMessages, getUserForSideBar, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSideBar)

messageRouter.get("/:id",protectRoute,  getMessages)

messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter