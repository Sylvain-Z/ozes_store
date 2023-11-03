import { Router } from "express";
import { check_token, getAllUsers, userInformations , signin, createAccount, updatePersonalsInformations, updateDeliveryInformations } from "../controller/users.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/check_token", auth, check_token);
router.get("/all", getAllUsers);
router.get("/:email", userInformations); // l'email correspond à l'id du slice user.js 

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/infos-perso-update/:email", updatePersonalsInformations);
router.post("/infos-livraison-update/:email", updateDeliveryInformations);



export default router;