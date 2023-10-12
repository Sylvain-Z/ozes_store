// import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate, useParams , useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCottonBureau } from '@fortawesome/free-brands-svg-icons';

import Loading from "../Containers/Loading";
import ClothesForm from "./Forms/clothesform"
import RingsForm from "./Forms/ringsform"

function ProductPage (){

    const navigate = useNavigate();
    const params   = useParams();
    const [ details , setDetails ] = useState(null);
    
    const { pathname } = useLocation();

    useEffect(() => {
        async function getData() {
            try {
                const details = await fetch("/api/v1/products/"+ params.cate_url + "/" + params.title_url);
                if(details.status === 404) {
                    navigate("/not-found");
                }
                if(details.status === 200){
                    const json = await details.json();
                    setDetails(json);
                }
                               
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, []);
                
                
    return (
        <>
            <Link to="/le_store"><p className="previous_store">Retour à la liste des produits</p></Link>

                {!details ? (
                    <Loading/>
                    
                ) : ( details.map( detail =>
                    <div className="product_page">
                        <div className="shop">

                            <img className="product_image" src={require("../../../assets/img/store/" + detail.file_name1)} alt={detail.caption1}/>

                            <article className="product_description">
                                <h2 className="product_name">{detail.title}</h2>
                                <p className="price"><strong>{detail.price}€</strong></p>
                                <p className="color"><strong>Couleur : {detail.color}</strong></p>


                                <form action="submit" className={pathname === "/le_store/bijoux/" + params.title_url ? "choose" : "hidden"}>

                                    <RingsForm/>
                        
                                </form>

                                <form action="submit" className={pathname === "/le_store/vetements/" + params.title_url ? "choose" : "hidden"}>

                                    <ClothesForm/>
                        
                                </form>

                            </article>
                        </div>

                        <p className="ring_description">{detail.description}</p>

                        <p className={pathname === "/le_store/vetements/" + params.title_url ? "infosup" : "hidden"}>{detail.shape}</p>

                        <p className={pathname === "/le_store/vetements/" + params.title_url ? "infosupplus" : "hidden"}>{detail.model_info}</p>

                        <p className={pathname === "/le_store/bijoux/" + params.title_url ? "infosup" : "hidden"}>{detail.infosup}</p>

                        <p className={pathname === "/le_store/bijoux/" + params.title_url ? "infosupplus" : "hidden"}>{detail.infosupplus}</p>

                        <p className={detail.material_style}><FontAwesomeIcon icon={faCottonBureau} style={{color: "#ffffff",}} /> {detail.material}</p>

                        <p className="infosup">{detail.madeplace}</p>

                    </div>
                    ))}
            
            
        </>
    )
};


export default ProductPage;