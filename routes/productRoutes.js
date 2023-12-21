import express from 'express';
import productController from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/cars', productController.addNewProduct)

export default productRouter;