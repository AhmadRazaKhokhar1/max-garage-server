import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMultipleOnCloudinary = async (files) => {
  try {
    if (!files || !files.carImages || files.carImages.length === 0) {
      console.error('Invalid or empty files array.');
      console.log('Files at this point:', files); // Log for comparison
      return null;
    }

    const responses = await Promise.all(
      files.carImages.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });
        fs.unlinkSync(files)
        console.log(result);
        return result;
      })
    );

    return responses;
  } catch (error) {
    console.error('Error in uploadMultipleOnCloudinary:', error);
    return null;
  }
};

export default uploadMultipleOnCloudinary;
