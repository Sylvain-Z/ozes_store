import { Router } from "express";
import { getAllCategories } from "../controller/categories.js";

const router = Router();

router.get("/all", getAllCategories);


export default router;
