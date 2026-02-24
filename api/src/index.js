import express from "express";
import dotenv from "dotenv"
import authRouter from "./routers/auth.router.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRouter from "./routers/message.router.js";
import cors from "cors"


dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin:["http://localhost:5173", "http://localhost:5174"],
  credentials:true
}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/message", messageRouter)

app.listen(PORT, () => {
  console.log(`Server is runnng on port ${PORT}`);
  connectDB()
});
