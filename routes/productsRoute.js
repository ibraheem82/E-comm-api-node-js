import express from 'express';
import { createProductCtrl } from '../controllers/productsCtrls.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';


const productRouter = express.Router();

productRouter.post('/', isLoggedIn, createProductCtrl);

export default productRouter;