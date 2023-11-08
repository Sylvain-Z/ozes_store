import { Router } from "express";
import { check_token, getAllUsers, userInformations , signin, createAccount, updateDelivery, updateLogin } from "../controller/users.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/check_token", auth, check_token);
router.get("/all", getAllUsers);
router.get("/:pseudo", userInformations);

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/infos-livraison-update/:pseudo", updateDelivery);
router.post("/infos-connexion-update/:pseudo", updateLogin);



export default router;