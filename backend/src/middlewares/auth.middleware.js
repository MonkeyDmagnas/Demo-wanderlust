import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const VerifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = req.cookies?.accessToken || (authHeader && authHeader.replace("Bearer ", ""));

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({
      message: error.message,
    });
  }
};
