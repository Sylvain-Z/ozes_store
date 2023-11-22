import { Router } from "express";
import products_routes from "./products.routes.js";
import categories_routes from "./categories.routes.js";
import users_routes from "./users.routes.js";
import employees_routes from "./employees.routes.js";
import messages_routes from "./messages.routes.js";

const router = Router();


router.use("/api/v1/products", products_routes);
router.use("/api/v1/categories", categories_routes);
router.use("/api/v1/users", users_routes);
router.use("/api/v1/employees", employees_routes);
router.use("/api/v1/messages", messages_routes);


router.get("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

export default router;
