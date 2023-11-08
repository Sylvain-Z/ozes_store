import { Router } from "express";
import { check_token, getAllEmployees, employeesInfo , signin, createAccount, updateInfo , updateLogin } from "../controller/employees.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/check_token", auth, check_token);
router.get("/all", getAllEmployees);
router.get("/:email", employeesInfo);

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/update/:email", updateInfo);
router.post("/infos-connexion-update/:email", updateLogin);



export default router;