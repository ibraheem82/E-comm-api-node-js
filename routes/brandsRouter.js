import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedin.js';
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl} from '../controllers/brandCtrl.js';


const brandsRouter = express.Router();
brandsRouter.post('/', isLoggedIn, createBrandCtrl)
brandsRouter.get('/',  getAllBrandsCtrl)
brandsRouter.get('/:id', getSingleBrandCtrl)
brandsRouter.delete('/:id', isLoggedIn, deleteBrandCtrl)
brandsRouter.put('/:id', isLoggedIn, updateBrandCtrl)


export default brandsRouter;