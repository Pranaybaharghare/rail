const { Router } = require("express");
const { connectIrctc } = require("../controller/irctc.controller");

const connectRoute = Router();
connectRoute.route("/connect").post(connectIrctc)

export default connectRoute;