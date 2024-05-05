import { Router } from "express";
import { getOneProductsFull , getProductsGlimpse , getProductsGalery , getProductsGaleryOffset , getRandom , getProductsDetails , getQuantitybyId, getSizesByProductId , getProductsByCategorie , getProductsByCategorieOffset , getProductsCart , getLastId , getSubcategories , getProdSubcateById , AddProduct , AddSubCategories , UpdateProduct , UpdateProductSubcate , UpdateProductPicById, DeleteProduct } from "../controller/products.js";
import { authe } from "../middlewares/authe.js";

const router = Router();

router.post("/add-product", authe, AddProduct); //  composant : Employees/ProductAdd 
router.post("/add-subcategorie", authe, AddSubCategories); // composant : Employees/ProductAddCate
router.post("/update/:id", authe, UpdateProduct); // composant : Employees/ProductUpdate
router.post("/update-subcate/:id", authe, UpdateProductSubcate); // composant : Employees/ProductUpdate
router.post("/update-pictures/:id", authe, UpdateProductPicById); // composant : Employees/ProductUpdate  // à supprimer ??

router.delete("/delete/:id", authe, DeleteProduct); // composant : Employees/ProductDelete

router.get("/one_full/:id", getOneProductsFull); // composant : Employees/ProductUpdate
router.get("/glimpse/:id", getProductsGlimpse); // composant : Employees/ProductDelete
router.get("/prod_subcate/:id", getProdSubcateById); // sert à récupérer la table products_subcategories pour changer le produit de sous catégorie - composant : Employees/ProductUpdate

router.get("/galery", getProductsGalery); // informations nécessaires à la page ../Shop/product_galery - version sans pagination
router.get("/galery/:firstpage", getProductsGaleryOffset); // informations nécessaires à la pagination de la galerie
router.get("/galerie_filtre/:cate_title", getProductsByCategorie); // sert à afficher les produits en fonction de la catégorie - version sans pagination
router.get("/galerie_filtre/:cate_title/:firstpage", getProductsByCategorieOffset); // sert à afficher les produits en fonction de la catégorie - version avec pagination

router.get("/sizes/:id", getSizesByProductId); // sert à récupérer les tailles pour la page product composant : Shop/Form/AddToCartForm
router.get("/quantity/:id", getQuantitybyId); // sert à afficher la quantité total d'un produit toute taille confondue 
router.get("/:title_url/:id", getProductsDetails); // page détails produits laissé de côté pour le moment
router.get("/last-product_id", getLastId); // sert à récupérer l'ID du dernier produit ajouté afin de renseigner le bon ID lors de la créatioin d'un produit sur les pages Employees/ProductPicAdd, Employees/ProductUpdate et Employees/ProductDelete
router.get("/subcate", getSubcategories); // sert à récupérer la categorie et son ID pour y faire référence
router.get("/random", getRandom); // sert à afficher 4 produits aléatoires // composant : Containers/Suggestion ->  Cart/Index + Shop/ProductPage

router.get("/:title_url", getProductsCart);

export default router;