import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
import { globalErrHandler } from '../middlewares/globalErrHandler.js';

// * Database Connection.
dbConnect();
const app = express();

// parse incoming datas
app.use(express.json());

// @Routes
app.use('/', userRoutes);


// * Err Middleware
app.use(globalErrHandler);

export default app;