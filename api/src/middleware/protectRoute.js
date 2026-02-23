import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(400).json({ message: "No token Provided" });
      return;
    }
  
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.status(400).json({ message: "Unauthorized-INvalid token" });
      return;
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "No User Found" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "internal Server Error" });
  }
};
