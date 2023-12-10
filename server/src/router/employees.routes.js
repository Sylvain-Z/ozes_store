import { Router } from "express";
import { check_token, getAllEmployees, getByEmail , getById , getEmployeeGlimpse , signin, createAccount, updateInfo , updateInfoEmployees , updateLogin , deleteEmployee } from "../controller/employees.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/check_token", auth, check_token);
router.get("/all", getAllEmployees);
router.get("/employeeBy/:id", getById); // composant : Employees/Management/updateprofil - permet à l'administrateur de voir les infos des salariés
router.get("/:email", getByEmail); // composant : Employees/Infos - permet au salarié de voir ses infos personnelles sur son compte
router.get("/glimpse/:id", getEmployeeGlimpse); // composant : Employees/Management/deleteprofil

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/update-employee/:id", updateInfoEmployees); // composant : Employees/Management/updateprofil - permet à l'administrateur de changer les infos des salariés
router.post("/update/:email", updateInfo); // composant : Employees/Infos - permet au salarié de changer ses infos personnelles
router.post("/infos-connexion-update/:email", updateLogin); // composant : Employees/Infos - permet au salarié de changer ses infos de connexion

router.delete("/delete/:id", deleteEmployee); // composant : Employees/Management/deleteprofil



export default router;