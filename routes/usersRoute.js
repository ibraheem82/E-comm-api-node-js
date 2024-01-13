import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfile } from '../controllers/usersCtrl.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.get('/profile', getUserProfile);

export default userRoutes;