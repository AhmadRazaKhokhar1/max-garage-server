import express from 'express';
import productController from '../controllers/productController.js';
import uploadFields from '../middlewares/multerMiddleWare.js';
import verifyAdmin from '../middlewares/jwtAdminMiddleWare.js';
import uploadMultipleOnCloudinary from '../Utils/cloudinaryMultipleMiddleWare.js';

const productRouter = express.Router();
const middlewareCheck = (req, res, next) => {
    console.log('Files from multer:', req.files);
    next();
  };
productRouter.post('/cars', uploadFields, middlewareCheck, uploadMultipleOnCloudinary, productController.addNewProduct);
productRouter.get('/search/:key', productController.findProduct);
productRouter.delete('/cars/:id', verifyAdmin, productController.deleteProduct);


export default productRouter;