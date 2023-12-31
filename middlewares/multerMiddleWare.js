import multer from "multer";
import fs from "fs";
const storage = new multer.diskStorage({
  destination: async (req, file, cb) => {
    const path = "C:/Users/USER/Desktop/Max Garage/Server/carImages";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  // limits: { fileSize: 20 * 1024 * 1024 }, //20MB max
});

const uploadFields = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
  { name: "carImages", maxCount: 12 }
]);


 export const uploadArray = upload.array("carImages", 12)

export default uploadFields;
