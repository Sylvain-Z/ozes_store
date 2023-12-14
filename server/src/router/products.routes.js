import { Router } from "express";
import { getOneProductsFull , getProductsGlimpse , getProductsGalery , getRandom , getProductsDetails , getQuantitybyId, getSizesByProductId , getProductsCart , getLastId , getSubcategories , getProdSubcateById , AddProduct , AddSubCategories , AddPictures , UpdateProduct , UpdateProductSubcate , UpdateProductPicById, DeleteProduct } from "../controller/products.js";

const router = Router();

router.post("/add-product", AddProduct); //  composant : Employees/ProductAdd 
router.post("/add-subcategorie", AddSubCategories); // composant : Employees/ProductAddCate
router.post("/update/:id", UpdateProduct); // composant : Employees/ProductUpdate
router.post("/update-subcate/:id", UpdateProductSubcate); // composant : Employees/ProductUpdate
router.post("/update-pictures/:id", UpdateProductPicById); // composant : Employees/ProductUpdate

router.delete("/delete/:id", DeleteProduct); // composant : Employees/ProductDelete

router.get("/one_full/:id", getOneProductsFull); // composant : Employees/ProductUpdate
router.get("/glimpse/:id", getProductsGlimpse); // composant : Employees/ProductDelete
router.get("/prod_subcate/:id", getProdSubcateById); // sert à récupérer la table products_subcategories pour changer le produit de sous catégorie - composant : Employees/ProductUpdate
router.get("/galery", getProductsGalery); // informations nécessaires à la page ../Shop/product_galery
router.get("/sizes/:id", getSizesByProductId); // sert à récupérer les tailles pour la page product composant : Shop/Form/AddToCartForm
router.get("/quantity/:id", getQuantitybyId); // sert à afficher la quantité total d'un produit toute taille confondue 
router.get("/:title_url/:id", getProductsDetails); // page détails produits laissé de côté pour le moment
router.get("/last-product_id", getLastId); // sert à récupérer l'ID du dernier produit ajouté afin de renseigner le bon ID lors de la créatioin d'un produit sur les pages Employees/ProductPicAdd, Employees/ProductUpdate et Employees/ProductDelete
router.get("/subcate", getSubcategories); // sert à récupérer la categorie et son ID pour y faire référence
router.get("/random", getRandom); // sert à récupérer la categorie et son ID pour y faire référence

router.get("/:title_url", getProductsCart);

export default router;