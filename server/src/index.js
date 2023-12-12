import express from "express";
import cors from "cors";
import "dotenv/config"
import bodyParser from "body-parser";

import router from "./router/index.routes.js";

const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const stripe = process.env.STRIPE_SK


app.use(express.static("public/store"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => console.log("Server http://localhost:" + PORT + "/admin"));