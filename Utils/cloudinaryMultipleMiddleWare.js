import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import pLimit from 'p-limit';

dotenv.config();

// Cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload function
const uploadMultipleOnCloudinary = async (localFilePaths) => {
  try {
    if (!localFilePaths || localFilePaths.length === 0) {
      return null;
    }
    const limit = pLimit(10);

    const uploadPromises = localFilePaths.map((localFilePath)=>{
        return limit(async()=>{
         const result =  await  cloudinary.uploader.upload(...localFilePath, { resource_type: 'auto' })
         return result;
        });
    })

    const responses = await Promise.all(uploadPromises);
   
    // Clear cache folder for each uploaded file
    responses.forEach((localFilePath) => {
      try {
        // Check if the file exists before attempting to delete it
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
        }
      } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
      }
    });

    // Extract secure URLs from responses
    const secureUrls = responses.map((response) => response.secure_url);

    return secureUrls;
  } catch (error) {
    console.error(`Error in cloudinary uploader function: ${error}`);

    // Clear cache folder for each uploaded file in case of an error
    localFilePaths.forEach((localFilePath) => {
      try {
        // Check if the file exists before attempting to delete it
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
        }
      } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
      }
    });

    return null;
  }
};

export default uploadMultipleOnCloudinary;
