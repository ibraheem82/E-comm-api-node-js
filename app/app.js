import dotenv from "dotenv";
dotenv.config();
import express from 'express';

import dbConnect from '../config/dbConnect.js';

import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
import userRoutes from '../routes/usersRoute.js';

// * Database Connection.
dbConnect();
const app = express();

// parse incoming datas
app.use(express.json());

// @Routes
app.use('/api/v1/users/', userRoutes);


// * Err Middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;