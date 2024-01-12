import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import dbConnect from '../config/dbConnect.js';
// * Database Connection.
dbConnect();
const app = express();

export default app;