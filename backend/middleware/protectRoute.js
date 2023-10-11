import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorzied" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userId).select("-password");

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in protectRoute", err.message);
  }
};

export default protectRoute;
