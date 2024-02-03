import dotenv from "dotenv";
dotenv.config();
import express from 'express';

import dbConnect from '../config/dbConnect.js';

import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
import userRoutes from '../routes/usersRoute.js';
import productRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";


// * Database Connection.
dbConnect();
const app = express();

// parse incoming datas, meaning the datas coming in the {req}, will be converted as json.
app.use(express.json());

// @Routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRouter);
app.use('/api/v1/categories/', categoriesRouter);


// * Err Middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;