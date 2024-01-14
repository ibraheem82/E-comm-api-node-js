import express from 'express';
import { createProductCtrl, getProductsCtrl } from '../controllers/productsCtrls.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';


const productRouter = express.Router();

productRouter.post('/', isLoggedIn, createProductCtrl);
productRouter.get('/', getProductsCtrl);

export default productRouter;