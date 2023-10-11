import { Router } from "express";
import { getProductsGalery , getProductsDetails } from "../controller/products.js";

const router = Router();

router.get("/galery", getProductsGalery);
router.get("/:cate_url/:title_url", getProductsDetails);


export default router;