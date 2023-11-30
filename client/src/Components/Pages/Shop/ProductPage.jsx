import { Link , useNavigate, useParams , useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCottonBureau } from '@fortawesome/free-brands-svg-icons';

import Loading from "../Containers/Loading/Index";
import AddToCartForm from "./Forms/AddToCartForm"

function ProductPage (){

    const params   = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [ products , setProducts ] = useState(null);
    const [ pictures , setPictures ] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const products = await fetch("/api/v1/products/" + params.title_url + "/" + params.id);
                if(products.status === 404) {
                    navigate("/not-found");
                }
                if(products.status === 200){
                    const json = await products.json();
                    setProducts(json);

                    const pictures = await fetch("/api/v1/pictures/products/" + params.id );
                        const jsonP = await pictures.json();
                        setPictures(jsonP);
                }


                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, []);
               
                            
    return (
        <>
            <p className="previous_page"><Link to="/le_store">Retour à la liste des produits</Link></p>

            {!products ? (
                    <Loading/>

                ) : ( products.map( product =>
                    <div className="product_page">
                        <div className="shop">
                            
                            <div className="product_image_ctn">
                                <img className="product_image" src={`/${product.file_name}`} alt={product.caption}/>  

                                <div className="pics_sub_ctn">
                                    {!pictures ? (
                                                <></>
                                            ) : ( pictures.map( picture =>
                                                    <img className="product_image_sub" src={`/${picture.file_name}`} alt={picture.caption}/>
                                                    ))}
                                </div>
                            </div>
                            

                            <article className="product_form">
                                <h2 className="product_name">{product.title}</h2>
                                <p className="price"><strong>{product.price}€</strong></p>
                                <p className="color"><strong>Couleur : {product.color}</strong></p>

                                    <AddToCartForm product={product}/>

                            </article>
                        </div>

                        <p className="description">{product.description}</p>

                        <p className="infosup">{product.shape}</p>

                        <p className="infosupplus">{product.model_info}</p>

                        <p className="infosup">{product.infosup}</p>

                        <p className="infosupplus">{product.infosupplus}</p>

                        <p className="material"><FontAwesomeIcon icon={faCottonBureau} style={{color: "#ffffff",}} /> {product.material}</p>

                        <p className="infosup">{product.madeplace}</p>

                    </div>
                    ))}


        </>
    )
};


export default ProductPage;