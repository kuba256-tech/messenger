import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`Data is Connected ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MONGO connected Error", error.message);
    throw error;
  }
};
