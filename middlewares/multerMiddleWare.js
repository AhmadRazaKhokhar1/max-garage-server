import multer from 'multer';
import fs from 'fs'
const storage = new multer.diskStorage({
  destination:async(req, file, cb)=>{
    const path = 'C:/Users/USER/Desktop/Max Garage/Server/imagesCache';
      cb(null, path);
     fs.mkdirSync(path, {recursive:true});
      cb(null, path);
  },
  filename:(req, file, cb)=>{
    cb(null, file.originalname)
  }
});
const upload = multer({
  storage:storage,
  limits:{fileSize: 10*1024*1024} //10MB max
});

const uploadFields = upload.fields([{name:'profileImage', maxCount:1 }, {name:'coverImage', maxCount:1}, ]);
export default uploadFields;