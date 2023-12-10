import { Router } from "express";
import { check_token, getAllUsers, userInformations , signin, createAccount, updateDelivery, updateLogin , DeleteUser } from "../controller/users.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/check_token", auth, check_token);
router.get("/all", getAllUsers);
router.get("/:pseudo", userInformations); // composants : HOC/Header - Users/delivery - Users/infoConnection

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/infos-livraison-update/:pseudo", updateDelivery); // composant : Users/DeliveryUpdate
router.post("/infos-connexion-update/:pseudo", updateLogin); // composant : Users/InfoConnectionUpdate

router.delete("/delete/:id", DeleteUser); // composant : Users/DeleteUser


export default router;