
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMultipleOnCloudinary = async (files) => {
  try {
    console.log('Files in uploadMultipleOnCloudinary:', files);
    
    const uploadPromises = files.map((file) => {
      const imgpath = file.path;
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imgpath, (result, error) => {
          if(!result){console.log(error)}else{console.log(result.url)}
          resolve(result);
          fs.unlinkSync(imgpath)
        });
      });
    });

    const responses = await Promise.all(uploadPromises);
    console.log(responses)
    return responses;
  } catch (error) {
    console.error('Error in uploadMultipleOnCloudinary:', error);
    return null;
  }
};

export default uploadMultipleOnCloudinary;
