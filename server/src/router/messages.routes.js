import { Router } from "express";
import { WriteMessage , ReadAll , ReadUserMessages, ReadOneStatus , AnswerMessages } from "../controller/messages.js";

const router = Router();

router.post("/write", WriteMessage); //  composants : Containers/ContactForm /index & Users/sendMessage
router.post("/answer/:id", AnswerMessages); //  composants : Employees/userMsgUpStat


router.get("/all", ReadAll); // composant : Employees/Messages
router.get("/user/:pseudo", ReadUserMessages); // composant : Employees/Messages
router.get("/:id", ReadOneStatus); // composant : Employees/Messages


export default router;