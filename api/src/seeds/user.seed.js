import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generatePassword } from "../lib/utils.js";

config();

const seedUsers = [
  
  {
    email: "test1@mail.com",
    fullName: "Emma Thompson",
    password: await generatePassword("123123"),
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "test2@mail.com",
    fullName: "Olivia Miller",
    password: await generatePassword("123123"),
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "test3@mail.com",
    fullName: "Sophia Davis",
    password: await generatePassword("123123"),
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.deleteMany()
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();