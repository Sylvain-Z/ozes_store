import { Router } from "express";
import { check_token, getAllUsers, userInformations , signin, createAccount, updateDelivery, updateLogin , DeleteUser } from "../controller/users.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/check_token", auth, check_token);
router.get("/all", auth, getAllUsers);
router.get("/:pseudo", auth, userInformations); // composants : HOC/Header - Users/Delivery - Users/InfoConnection - Users/DeleteUser

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/infos-livraison-update/:pseudo", auth, updateDelivery); // composant : Users/DeliveryUpdate
router.post("/infos-connexion-update/:pseudo", auth, updateLogin); // composant : Users/InfoConnectionUpdate

router.delete("/delete/:id", auth, DeleteUser); // composant : Users/DeleteUser


export default router;