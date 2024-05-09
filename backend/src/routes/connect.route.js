import { Router } from "express";
import { connectIrctc } from "../controller/irctc.controller.js";

const connectRoute = Router();
connectRoute.route("/connect").post(connectIrctc);

export default connectRoute;
