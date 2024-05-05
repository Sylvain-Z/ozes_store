import { Router } from "express";
import { WriteMessage , ReadAll , EmployeeReadUserMessages, UserReadHisMessages , ReadOneStatus , AnswerMessages } from "../controller/messages.js";
import { auth } from "../middlewares/auth.js";
import { authe } from "../middlewares/authe.js";

const router = Router();

router.post("/write", WriteMessage); //  composants : Containers/ContactForm /index & Users/Message/Index
router.post("/answer/:id", authe, AnswerMessages); //  composants : Employees/Messages/MsgAnswer

router.get("/user-read/:user_id", auth, UserReadHisMessages); // composant : Users/Messages/UserMsgRead
router.get("/all", authe, ReadAll); // composant : Employees/Messages/
router.get("/employees-read/:id", authe, EmployeeReadUserMessages); // composant : Employees/Messages/MsgAnswer
router.get("/:id", authe, ReadOneStatus); // composant : Employees/Messages


export default router;