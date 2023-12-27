import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const verifyUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "The login session has expired.",
      });
    }
    const editToken = token.replace("Bearer", "").trim();
    const jwtToken = jwt.verify(editToken, process.env.JWT_SECRET_KEY);
    const userData = await UserModel.findOne({ _id: jwtToken._id });
    req.user = userData;
    next();
  } catch (error) {
    console.log(`There was an error in the JWT: ${error}`);
    return res.status(500).json({
      success: false,
      message: "There was an internal server error.",
    });
  }
};

export default verifyUser;
