import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedin.js';
import { creatReviewCtrl } from '../controllers/reviewCtrl.js';

const reviewRouter = express.Router();
reviewRouter.post('/:productID', isLoggedIn, creatReviewCtrl);

export default reviewRouter;