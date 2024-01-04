import { Router } from "express";
import { getPicturesByProductId , getPicturesByIds , AddPictures , DeletePictures} from "../controller/pictures.js";
import { authe } from "../middlewares/authe.js";

const router = Router();

router.post("/add-pictures/:id", authe, AddPictures); //  composant : Employees/ProductAddPic & ProductUpdatePicForm
  

router.delete("/delete/:product_id/:_id", DeletePictures); // composant : Employees/ProductDelete

router.get("/products/:id", getPicturesByProductId); // photos nécessaires à la page ../Shop/product_page
router.get("/:product_id/:id", getPicturesByIds); // photos nécessaires à la page ../Shop/product_page



export default router;