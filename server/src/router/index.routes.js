import { Router } from "express";
import products_routes from "./products.routes.js";
import orders_routes from "./orders.routes.js";
import categories_routes from "./categories.routes.js";
import sizes_routes from "./sizes.routes.js";
import pictures_routes from "./pictures.routes.js";
import users_routes from "./users.routes.js";
import employees_routes from "./employees.routes.js";
import messages_routes from "./messages.routes.js";
import stripe_routes from "./stripe.routes.js";

const router = Router();


router.use("/api/v1/products", products_routes);
router.use("/api/v1/orders", orders_routes);
router.use("/api/v1/categories", categories_routes);
router.use("/api/v1/sizes", sizes_routes);
router.use("/api/v1/pictures", pictures_routes);
router.use("/api/v1/users", users_routes);
router.use("/api/v1/employees", employees_routes);
router.use("/api/v1/messages", messages_routes);
router.use("/api/v1/stripe", stripe_routes);


router.get("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

export default router;
