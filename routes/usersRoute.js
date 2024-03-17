import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfile, updateShippingAddressCtrl } from '../controllers/usersCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedin.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfile);
userRoutes.put('/update/shipping', isLoggedIn, updateShippingAddressCtrl);

export default userRoutes;