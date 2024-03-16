import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedin.js';
import { createColorCtrl, getAllColorsCtrl, deleteColorCtrl, getSingleColorCtrl, updateColorCtrl,  } from '../controllers/colorCtrl.js';
createColorCtrl


const colorRouter = express.Router();
colorRouter.post('/', isLoggedIn, createColorCtrl)
colorRouter.get('/',  getAllColorsCtrl)
colorRouter.get('/:id', getSingleColorCtrl)
colorRouter.delete('/:id', isLoggedIn, deleteColorCtrl)
colorRouter.put('/:id', isLoggedIn, updateColorCtrl)


export default colorRouter;