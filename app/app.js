import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/usersRoute.js';
// * Database Connection.
dbConnect();
const app = express();

// parse incoming datas
app.use(express.json());

app.use('/', userRoutes);

export default app;