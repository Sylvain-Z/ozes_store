import { Router } from "express";
import { getProductsGalery , getProductsDetails , getClothes , getClothesDetails , getJewelry , getJewelryDetails , getProductsCart , getLastId , AddProduct , AddCategories , AddPictures } from "../controller/products.js";

const router = Router();

router.post("/add-product", AddProduct);
router.post("/add-subcategorie", AddCategories);
router.post("/add-pictures", AddPictures);

router.get("/galery", getProductsGalery);
router.get("/:cate_url/:title_url", getProductsDetails);
router.get("/vetements", getClothes);
router.get("/vetements/:title_url", getClothesDetails);
router.get("/bijoux", getJewelry);
router.get("/bijoux/:title_url", getJewelryDetails);
router.get("/last-product_id", getLastId);

router.get("/:title_url", getProductsCart);

export default router;