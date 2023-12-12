import { Router } from "express";
import { getProductCartByRef , CreateOrder , CreateOrderLocalStorage , getOrders , getOrdersByID , UpdateTrackingNumber , getUserOrders , getOrdersByUserID } from "../controller/orders.js";

const router = Router();

router.post("/new_order", CreateOrder); // composant : Cart/Resume
router.post("/new_orderLS", CreateOrderLocalStorage); // composant : Cart/Resume
router.post("/tracking_number/:id", UpdateTrackingNumber); // composant : Cart/Resume

router.get("/product/:reference", getProductCartByRef); // composant : Cart/Index
router.get("/all", getOrders); // composant : Employees/Sales/Index
router.get("/:id", getOrdersByID); // composant : Employees/Sales/OrderPage
router.get("/order_user/:id", getUserOrders); // composant : User/Orders/Orders
router.get("/:userid/:orderid", getOrdersByUserID); // composant : User/Orders/OrderUserPage


export default router;