import express from 'express';
import productController from '../controllers/productController.js';
import uploadFields from '../middlewares/multerMiddleWare.js';
import verifyAdmin from '../middlewares/jwtAdminMiddleWare.js';

const productRouter = express.Router();

productRouter.post('/cars',verifyAdmin, uploadFields, productController.addNewProduct);
productRouter.get('/search/:key', productController.findProduct);
productRouter.delete('/cars/:id', verifyAdmin, productController.deleteProduct);


export default productRouter;