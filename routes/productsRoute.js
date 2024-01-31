import express from 'express';
import { createProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from '../controllers/productsCtrls.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';


const productRouter = express.Router();

productRouter.post('/', isLoggedIn, createProductCtrl);
productRouter.get('/', getProductsCtrl);
productRouter.get('/:id', getProductCtrl);
productRouter.put('/:id', updateProductCtrl);

export default productRouter;