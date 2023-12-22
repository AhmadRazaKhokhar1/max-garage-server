import express from 'express';
import productController from '../controllers/productController.js';
import uploadFields from '../middlewares/multerMiddleWare.js';
const productRouter = express.Router();

productRouter.post('/cars',uploadFields, productController.addNewProduct);
productRouter.post('/search', productController.findOneProduct);


export default productRouter;