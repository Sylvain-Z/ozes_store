import { Router } from "express";
import { getSizesByProductId  , getProductSizeByIds , AddSizes , UpdateSizes , DeleteSizes} from "../controller/sizes.js";
import { authe } from "../middlewares/authe.js";

const router = Router();

router.post("/add-sizes/:product_id", authe, AddSizes); //  composant : Employees/Stock/Products/ProductAddSizes
router.post("/update-sizes/:product_id/:size_id", authe, UpdateSizes); //  composant : Employees/Stock/Sizes/updateSizes

router.delete("/delete/:product_id/:size_id", authe, DeleteSizes); // composant : Employees//Stock/Sizes/DeleteSizes

router.get("/:product_id", authe, getSizesByProductId); // Employees/Stock/Products/productAddSizes
router.get("/:product_id/:id", authe, getProductSizeByIds); //  composant : Employees/Stock/Sizes/UpdateSizes


export default router;