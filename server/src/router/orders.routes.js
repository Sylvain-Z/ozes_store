import { Router } from "express";
import { getProductCartByRef , CreateOrder , CreateOrderLocalStorage , getOrders , getOrdersByID , UpdateTrackingNumber , getUserOrders , getOrdersByUserID } from "../controller/orders.js";
import { authe } from "../middlewares/authe.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/new_order", CreateOrder); // composant : Cart/Resume
router.post("/new_orderLS", CreateOrderLocalStorage); // composant : Cart/Resume
router.post("/tracking_number/:id", authe, UpdateTrackingNumber); // Employees/Sales/OrderPage

router.get("/product/:reference", getProductCartByRef); // composant : Cart/Index
router.get("/all", authe, getOrders); // composant : Employees/Sales/Index
router.get("/:id", authe, getOrdersByID); // composant : Employees/Sales/OrderPage
router.get("/order_user/:id", auth, getUserOrders); // composant : User/Orders/Orders
router.get("/:userid/:orderid", auth, getOrdersByUserID); // composant : User/Orders/OrderUserPage


export default router;