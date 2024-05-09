import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

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
import connectRoute from "./routes/connect.route.js";


//route declaration
app.use("/api",connectRoute);

export default app;