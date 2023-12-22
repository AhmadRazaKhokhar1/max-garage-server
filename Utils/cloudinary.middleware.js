import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'; dotenv.config();
import fs from 'fs';

//Cloudninary configurations
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Upload function
const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath){return null}
        const response =await cloudinary.uploader.upload(localFilePath, {resource_type:'auto'});
        //clear cache folder
        setTimeout(()=>{
            fs.unlinkSync(localFilePath);
        }, 3000)
        return response.secure_url;
    } catch (error) {
        console.log(`There was an error in cloudinary uploader function`);
        setTimeout(()=>{
            fs.unlinkSync(localFilePath);
        }, 3000)
        return null
    }
}

export default uploadOnCloudinary;