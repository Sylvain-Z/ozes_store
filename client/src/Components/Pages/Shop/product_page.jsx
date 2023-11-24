import { Link , useNavigate, useParams , useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCottonBureau } from '@fortawesome/free-brands-svg-icons';

import Loading from "../Containers/Loading";
import ProductForm from "./Forms/productform"

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

                    const pictures = await fetch("/api/v1/products/pictures/" + params.id );
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

                ) : ( products.map( p =>
                    <div className="product_page">
                        <div className="shop">
                            
                            <div className="product_image_ctn">
                                <img className="product_image" src={require("../../../assets/img/store/" + p.file_name)} alt={p.caption}/>

                                <div className="pics_sub_ctn">
                                    {!pictures ? (
                                                <></>
                                            ) : ( pictures.map( pc =>
                                                    <img className="product_image_sub" src={require("../../../assets/img/store/" + pc.file_name)} alt={pc.caption}/>
                                                    ))}
                                </div>
                            </div>
                            

                            <article className="product_form">
                                <h2 className="product_name">{p.title}</h2>
                                <p className="price"><strong>{p.price}€</strong></p>
                                <p className="color"><strong>Couleur : {p.color}</strong></p>

                                    <ProductForm products={products}/>

                            </article>
                        </div>

                        <p className="description">{p.description}</p>

                        <p className="infosup">{p.shape}</p>

                        <p className="infosupplus">{p.model_info}</p>

                        <p className="infosup">{p.infosup}</p>

                        <p className="infosupplus">{p.infosupplus}</p>

                        <p className="material"><FontAwesomeIcon icon={faCottonBureau} style={{color: "#ffffff",}} /> {p.material}</p>

                        <p className="infosup">{p.madeplace}</p>

                    </div>
                    ))}


        </>
    )
};


export default ProductPage;