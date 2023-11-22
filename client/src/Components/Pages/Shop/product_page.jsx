import { Link , useNavigate, useParams , useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCottonBureau } from '@fortawesome/free-brands-svg-icons';

import Loading from "../Containers/Loading";
import ClothesForm from "./Forms/clothesform"
import RingsForm from "./Forms/ringsform"

function ProductPage (){

    const params   = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [ products , setProducts ] = useState(null);
    const [ picSub , setPicSub ] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const products = await fetch("/api/v1/products/"+ params.cate_title + "/" + params.title_url);
                if(products.status === 404) {
                    navigate("/not-found");
                }
                if(products.status === 200){
                    const json = await products.json();
                    setProducts(json);

                    const picSub = await fetch("/api/v1/products/pics_sub/" + params.id );
                        const jsonP = await picSub.json();
                        setPicSub(jsonP);
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
                                    {!picSub ? (
                                                <></>
                                            ) : ( picSub.map( ps =>
                                                <>
                                                    <img className="product_image_sub" src={require("../../../assets/img/store/" + ps.file_name)} alt={ps.caption}/>
                                                </>
                                                    ))}
                                </div>
                            </div>
                            

                            <article className="product_form">
                                <h2 className="product_name">{p.title}</h2>
                                <p className="price"><strong>{p.price}€</strong></p>
                                <p className="color"><strong>Couleur : {p.color}</strong></p>

                                    <RingsForm products={products} />

                                    <ClothesForm products={products}/>

                            </article>
                        </div>

                        <p className="description">{p.description}</p>

                        <p className={pathname === "/le_store/vetements/" + params.title_url + "/" + params.id  ? "infosup" : "hidden"}>{p.shape}</p>

                        <p className={pathname === "/le_store/vetements/" + params.title_url + "/" + params.id  ? "infosupplus" : "hidden"}>{p.model_info}</p>

                        <p className={pathname === "/le_store/bijoux/" + params.title_url + "/" + params.id ? "infosup" : "hidden"}>{p.infosup}</p>

                        <p className={pathname === "/le_store/bijoux/" + params.title_url + "/" + params.id  ? "infosupplus" : "hidden"}>{p.infosupplus}</p>

                        <p className="matérial"><FontAwesomeIcon icon={faCottonBureau} style={{color: "#ffffff",}} /> {p.material}</p>

                        <p className="infosup">{p.madeplace}</p>

                    </div>
                    ))}


        </>
    )
};


export default ProductPage;