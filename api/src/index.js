import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routers/message.router.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import mongoose from "mongoose";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../front", "dist", "index.html"));
  });
}

const run = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server is runnng on port ${PORT}`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((e) => {
  console.error("Server startup failed:", e.message);
  process.exit(1);
});
