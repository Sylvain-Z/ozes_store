import { Router } from "express";
import { check_token, getAllEmployees, getByEmail , getById , getEmployeeGlimpse , signin, createAccount, updateInfo , updateInfoEmployees , updateLogin , deleteEmployee } from "../controller/employees.js";
import { authe } from "../middlewares/authe.js";

const router = Router();

router.get("/check_token", authe, check_token);
router.get("/all", authe, getAllEmployees); // composant : Employees/Management/Index - permet à l'administrateur de voir les infos des salariés
router.get("/employeeBy/:id", authe, getById); // composant : Employees/Management/Updateprofil - permet à l'administrateur de voir les infos des salariés
router.get("/:email", authe, getByEmail); // composant : Employees/Infos - permet au salarié de voir ses infos personnelles sur son compte
router.get("/glimpse/:id", authe, getEmployeeGlimpse); // composant : Employees/Management/DeleteProfil

router.post("/signup", createAccount);
router.post("/signin", signin);
router.post("/update-employee/:id", authe, updateInfoEmployees); // composant : Employees/Management/Updateprofil - permet à l'administrateur de changer les infos des salariés
router.post("/update/:email", authe, updateInfo); // composant : Employees/Infos - permet au salarié de changer ses infos personnelles
router.post("/infos-connexion-update/:email", authe, updateLogin); // composant : Employees/Infos - permet au salarié de changer ses infos de connexion

router.delete("/delete/:id", authe, deleteEmployee); // composant : Employees/Management/DeleteProfil



export default router;