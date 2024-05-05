import { Router } from "express";
import { getCategories , getCategoryById, getSubcategories  , getSubategoryById , AddCategories , AddSubcategories , DeleteCategorie , DeleteSubcategorie } from "../controller/categories.js";
import { authe } from "../middlewares/authe.js";

const router = Router();

router.post("/add-category", authe, AddCategories); //  composant : Employees/Stock/Categories/
router.post("/add-subcategory", authe, AddSubcategories); // composant : Employees/Stock/Subcategories/
//ajouter un route pour update le cate_title

router.delete("/categories/delete/:id", authe, DeleteCategorie); // composant : Employees//Stock/Categories/Delete
router.delete("/subcategories/delete/:id", authe, DeleteSubcategorie); // composant : Employees/Stock/Subcategories/Delete

router.get("/categories", getCategories); // composant : Employees/Stock/Categories/
router.get("/categories/:id", authe, getCategoryById); // composant : Employees/Stock/Categories/
router.get("/subcategories", authe, getSubcategories); // composant : Employees/ProductUpdate
router.get("/subcategories/:id", authe, getSubategoryById); // composant : Employees/Stock/Categories/


export default router;