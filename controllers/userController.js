import uploadOnCloudinary from "../Utils/cloudinary.middleware.js";
import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
//user controller
const userController = {
  // Register Controller
  register: async (req, res) => {
    try {
      const userExists = await UserModel.findOne({ email: req.body.email });

      if (userExists) {
        return res.status(409).json({
          success: false,
          message: "User already exists please login",
        });
      }

      const localProfileImage = req.files.profileImage[0]?.path;
      const localCoverImage = req.files.coverImage[0]?.path;

      
      if(!localProfileImage){
        return res.status(400).json({success:false, message:"Profile image is required"});
      }
      const profileImage = await uploadOnCloudinary(localProfileImage);
      const coverImage = await uploadOnCloudinary(localCoverImage);
        console.log(coverImage, profileImage)
      const newUserDetails = await new UserModel({
        fullName: req.body.fullName,
        profileImage: profileImage,
        coverImage: coverImage || '',
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        gender: req.body.gender,
        industry: req.body.industry,
        qualification: req.body.qualification,
        password: req.body.password,
      });
      
      const userDetails = await newUserDetails.save();

      res.status(201).json({
        success: true,
        message: "Successfully registered",
        userDetails: userDetails,
      });
    } catch (error) {
      console.log(`There was an error in registration controller⚠️: ${error}`);
      return res.status(500).json({
        success: false,
        message: "There was an internal server error",
      });
    }
  },

  // Login Controller
  login: async (req, res) => {
    try {
      const verifiedEmail = await UserModel.findOne({email:req.body.email});
      if(!verifiedEmail){return res.status(404).json({success:false, message:"Invalid credentials"})};
      
      const verifiedUser = await bcrypt.compare(req.body.password, verifiedEmail.password);
      if(!verifiedUser){
        return res.status(404).json({success:false, message: "Invalid credentials"});
      }
      const userDetails = await UserModel.findOne({_id:verifiedEmail._id}).select('-password');
      const token = await userDetails.generateJwtToken();
     return res.status(202).json({success:true, message:"Login successful", userDetails:userDetails, token:token});
    } catch (error) {
      console.log(`There was an error in login controller⚠️: ${error}`);
      return res.status(500).json({
        success: false,
        message: "There was an internal server error",
      });
    }
  },
  //Fetch all users
  allUsers:async(req, res)=>{
    const data = await UserModel.find({});
    res.status(200).json({success:true, message:"Fetched all users", data:data})
  },
  //Find User By Id Controller
  personalDetails: async (req, res) => {
    try {
        const userDetails = req.user;

      res.status(200).json({success:true, message:"fetched user successfully", userDetails:userDetails});

    } catch (error) {
      console.log(
        `There was an error in personalDetails controller⚠️: ${error}`
      );
      return res.status(500).json({
        success: false,
        message: "There was an internal server error",
      });
    }
  },

  // Delete User By Id Controller
  deleteUser: async (req, res) => {
    try {
      const userDetails = req.user;
      if(!userDetails){return res.status(401).json({success:false, message:"Cloudn't delete"})};

      const deleteUser = await UserModel.findOneAndDelete({_id:userDetails._id});
      return res.status(200).send({success:true, message:"Deleted successfully", deletedUser:deleteUser})
    } catch (error) {
      console.log(`There was an error in deleteUser controller⚠️: ${error}`);
      return res.status(500).json({
        success: false,
        message: "There was an internal server error",
      });
    }
  },

  // Update User By Id Controller
  updateUser: async (req, res) => {
    try {
    } catch (error) {
      console.log(`There was an error in registration controller⚠️: ${error}`);
      return res.status(500).json({
        success: false,
        message: "There was an internal server error",
      });
    }
  },
};

export default userController;
