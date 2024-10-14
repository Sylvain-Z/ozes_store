import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchData } from '../../../assets/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCottonBureau } from '@fortawesome/free-brands-svg-icons';

import Loading from "../Containers/Loading/Index";
import AddToCartForm from "./Forms/AddToCartForm"
import Suggestion from '../Containers/Suggestion/Index';

function ProductPage() {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [params]);

    const [product, setProduct] = useState(null);
    const [pictures, setPictures] = useState(null);

    useEffect(() => {
        async function getProductDetails() {
            try {
                const productInfo = await fetchData(`products/${params.title_url}/${params.id}`);
                if (productInfo) {
                    setProduct(productInfo[0]);

                    const picturesList = await fetchData(`pictures/products/${params.id}`);
                    setPictures(picturesList);
                } else {
                    navigate("/not-found");
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getProductDetails();
    }, [product, pictures]);


    return (
        <>
            <p className="previous_page"><Link to="/le_store">Retour à la liste des produits</Link></p>

            {!product ? (
                <Loading />

            ) : (
                <div className="product_page" key={product.id}>
                    <div className="shop">

                        <div className="product_image_ctn">
                            <img className="product_image" src={`/${product.file_name}`} alt={product.caption} />

                            <div className="pics_sub_ctn">
                                {!pictures ? (
                                    <></>
                                ) : (pictures.map(picture =>
                                    <img className="product_image_sub" src={`/${picture.file_name}`} alt={picture.caption} key={picture.id} />
                                ))}
                            </div>
                        </div>


                        <article className="product_form">
                            <h2 className="product_name">{product.title}</h2>
                            <p className="price"><strong>{product.price}€</strong></p>
                            <p className="color"><strong>Couleur : {product.color}</strong></p>

                            <AddToCartForm product={product} /> {/* Formulaire Taille et ajouter au panier */}

                        </article>
                    </div>

                    <p className="description">{product.description}</p>

                    <p className="infosup">{product.shape}</p>

                    <p className="infosupplus">{product.model_info}</p>

                    <p className="infosup">{product.infosup}</p>

                    <p className="infosupplus">{product.infosupplus}</p>

                    <p className="material"><FontAwesomeIcon icon={faCottonBureau} style={{ color: "#ffffff", }} /> {product.material}</p>

                    <p className="infosup">{product.madeplace}</p>

                </div>
            )}

            <Suggestion />
        </>
    )
};


export default ProductPage;