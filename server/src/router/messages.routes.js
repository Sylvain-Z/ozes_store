import { Router } from "express";
import { WriteMessage , ReadAll , EmployeeReadUserMessages, UserReadHisMessages , ReadOneStatus , AnswerMessages } from "../controller/messages.js";

const router = Router();

router.post("/write", WriteMessage); //  composants : Containers/ContactForm /index & Users/Message/Index
router.post("/answer/:id", AnswerMessages); //  composants : Employees/Messages/MsgAnswer

router.get("/all", ReadAll); // composant : Employees/Messages/
router.get("/user-read/:user_id", UserReadHisMessages); // composant : Employees/Messages/
router.get("/employees-read/:id", EmployeeReadUserMessages); // composant : Employees/Messages/MsgAnswer
router.get("/:id", ReadOneStatus); // composant : Employees/Messages


export default router;