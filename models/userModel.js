import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { stringify } from "querystring";

// User schema
const userSchema = new mongoose.Schema({
    fullName:{
        type:String, require:true,
    },
    email:{
        type:String, require:true, trim:true, unique:true
    },
    phone:{
        type:String, require:true, trim:true, unique:true
    },
    age:{
        type:Number, require:true, trim:true,
    },
    gender:{
        type:String, require:true, 
    },
    industry:{
        type:String, require:true,
    },
    qualification:{
        type:String, require:true
    },
    password:{
        type:String, require:true,
    },
    profileImage:{
        type:String, require:true,
    },
    coverImage:{
        type:String, require:true,
    },
    isAdmin:{
        type:Boolean, require:true,
    }
},
{
    timestamps:true,
});

// hashing password
userSchema.pre('save', async function(){
    try {

        const saltRound = 14;
        const hashedPassword = await bcrypt.hash(this.password, saltRound);
        this.password = hashedPassword
    } catch (error) {
        console.log(`There was an error in hashing password! ${error}`)
    }
});

// schema method for token generation
userSchema.methods.generateJwtToken = async function(){
    try {
       const token = await jwt.sign({
            _id:this._id,
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:'30d'
        });
        return token;
    } catch (error) {
        console.log(`There was an error in JWT : ${error}`)
    }
}

// User model 
const UserModel = await new mongoose.model('User_Detail', userSchema);

export default UserModel;