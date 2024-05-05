import { Router } from "express";
import { Charge } from "../controller/stripe.js";

const router = Router();


router.post("/charge", Charge); //  composant : Employees/ProductAdd 


export default router;