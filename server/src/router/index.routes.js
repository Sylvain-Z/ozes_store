import { Router } from "express";
import products_routes from "./products.routes.js";
import categories_routes from "./categories.routes.js";

const router = Router();


router.use("/api/v1/products", products_routes);
router.use("/api/v1/categories", categories_routes);


router.get("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

export default router;
