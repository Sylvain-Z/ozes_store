import { Router } from "express";
import { getCategories , getCategoryById, getSubcategories  , getSubategoryById , AddCategories , AddSubcategories , DeleteCategorie , DeleteSubcategorie } from "../controller/categories.js";

const router = Router();

router.post("/add-category", AddCategories); //  composant : Employees/Stock/Categories/
router.post("/add-subcategory", AddSubcategories); // composant : Employees/Stock/Subcategories/

router.delete("/categories/delete/:id", DeleteCategorie); // composant : Employees//Stock/Categories/Delete
router.delete("/subcategories/delete/:id", DeleteSubcategorie); // composant : Employees/Stock/Subcategories/Delete

router.get("/categories", getCategories); // composant : Employees/Stock/Categories/
router.get("/categories/:id", getCategoryById); // composant : Employees/Stock/Categories/
router.get("/subcategories", getSubcategories); // composant : Employees/ProductUpdate
router.get("/subcategories/:id", getSubategoryById); // composant : Employees/Stock/Categories/


export default router;