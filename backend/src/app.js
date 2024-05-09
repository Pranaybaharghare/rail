import express from "express";
import cors from "cors";
const path = require('path');

const app = express();

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, '../public')));


//route imports
import connectRoute from "./routes/connect.route";


//route declaration
app.use("/api/connect/",connectRoute);