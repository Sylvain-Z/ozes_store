import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FETCH_URL } from '../../../../../assets/const';

import Loading from "../../../Containers/Loading/Index";
import PreviousPage from "./Components/PreviousPage";
import ProductUpdateInfos from "./ProductUpdateInfos";
import ProductAddSizes from "./ProductAddSizes";
import ProductUpdateCate from "./ProductUpdateCate";
import ProductUpdatePic from "./ProductUpdatePic";

function ProductUpdate() {

    const navigate = useNavigate();
    const params = useParams();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        async function getProductUpdate() {
            try {
                const product = await fetch(FETCH_URL + "products/one_full/" + params.id);  // récupère toutes les informations de la table product en fonction de l'id du produit
                if (product.status === 404) {
                    navigate("/employes/not-found");
                }
                if (product.status === 200) {
                    const json = await product.json();
                    setProduct(json);
                }
                const quantity = await fetch(FETCH_URL + "products/quantity/" + params.id); // récupère le total des quantité pour toutes les tailles existantes du produit
                if (quantity.status === 200) {
                    const json = await quantity.json();
                    setQuantity(json);
                }

            } catch (error) {
                throw Error(error);
            }
        }
        getProductUpdate();
    }, []);


    return (
        <>
            {!product ? (
                <Loading />

            ) : (
                <>
                    <section className="form_section">

                        <h3 className="form_title read">Modifier</h3>
                        <h3 className="form_title read">{product[0].title}</h3>

                        {!quantity ? (<>Quantité en stock : inconnue</>) : (<><h3 className="form_title read">Quantité en stock : {quantity[0].total}</h3></>)}

                        <img className="form_image" src={`/${product[0].file_name}`} alt={product[0].caption} />



                    </section>

                    <PreviousPage />

                    <ProductUpdateInfos product={product} />

                    <PreviousPage />

                    <ProductAddSizes />

                    <ProductUpdateCate />

                    <ProductUpdatePic />

                    <PreviousPage />

                </>

            )}


        </>
    )
};


export default ProductUpdate;