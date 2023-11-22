import { Router } from "express";
import { getOneProductsFull , getProductsGlimpse , getProductsGalery , getPics_subById , getProductsDetails , getClothes , getClothesDetails , getJewelry , getJewelryDetails , getProductsCart , getLastId , getSubcategories , getProdSubcateById , getPicById , AddProduct , AddCategories , AddPictures , UpdateProduct , UpdateProductSubcate , UpdateProductPicById, DeleteProduct } from "../controller/products.js";

const router = Router();

router.post("/add-product", AddProduct); //  composant : Employees/ProductAdd 
router.post("/add-subcategorie", AddCategories); // composant : Employees/ProductAddCate
router.post("/add-pictures", AddPictures); // composant : Employees/ProductAddPic
router.post("/update/:id", UpdateProduct); // composant : Employees/ProductUpdate
router.post("/update-subcate/:id", UpdateProductSubcate); // composant : Employees/ProductUpdate
router.post("/update-pictures/:id", UpdateProductPicById); // composant : Employees/ProductUpdate

router.delete("/delete/:id", DeleteProduct); // composant : Employees/ProductDelete

router.get("/one_full/:id", getOneProductsFull); // composant : Employees/ProductUpdate
router.get("/glimpse/:id", getProductsGlimpse); // composant : Employees/ProductDelete
router.get("/pictures/:id", getPicById); // sert à récupérer la table pictures pour changer les infos des images - composant : Employees/ProductUpdatePic
router.get("/prod_subcate/:id", getProdSubcateById); // sert à récupérer la table products_subcategories pour changer le produit de sous catégorie - composant : Employees/ProductUpdate
router.get("/galery", getProductsGalery); // informations nécessaires à la page ../Shop/product_galery
router.get("/pics_sub/:id", getPics_subById); // photos nécessaires à la page ../Shop/product_page
router.get("/:cate_title/:title_url/:id", getProductsDetails); // page détails produits laissé de côté pour le moment
router.get("/vetements", getClothes); // récupère tous les produits de la catégorie vetements
router.get("/vetements/:title_url", getClothesDetails); // récupère un produit spécifique de la catégorie vetements
router.get("/bijoux", getJewelry); // récupère tous les produits de la catégorie bijoux
router.get("/bijoux/:title_url", getJewelryDetails); // récupère un produit spécifique de la catégorie vetements
router.get("/last-product_id", getLastId); // sert à récupérer l'ID du dernier produit ajouté afin de renseigner le bon ID lors de la créatioin d'un produit sur les pages Employees/ProductPicAdd, Employees/ProductUpdate et Employees/ProductDelete
router.get("/subcate", getSubcategories); // sert à récupérer la categorie et son ID pour y faire référence

router.get("/:title_url", getProductsCart);

export default router;