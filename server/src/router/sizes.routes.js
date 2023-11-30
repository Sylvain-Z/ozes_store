import { Router } from "express";
import { getSizes /* , getSizesById */ , getSizesByProductId  , getProductSizeByIds , AddSizes , UpdateSizes , DeleteSizes} from "../controller/sizes.js";

const router = Router();

router.post("/add-sizes/:product_id", AddSizes); //  composant : Employees/Stock/Products/productAddSizes
router.post("/update-sizes/:product_id/:size_id", UpdateSizes); //  composant : Employees/Stock/Sizes/updateSizes

router.delete("/delete/:product_id/:size_id", DeleteSizes); // composant : Employees//Stock/Sizes/deleteSizes

router.get("/all", getSizes); // composant : Employees/Stock/sizes/ pas utilisé pour le moment
router.get("/:product_id", getSizesByProductId); // Employees/Stock/Products/productAddSizes
router.get("/:product_id/:id", getProductSizeByIds); //  composant : Employees/Stock/Sizes/updateSizes


export default router;