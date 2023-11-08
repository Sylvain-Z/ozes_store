import { Link , useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


import Loading from "../Containers/Loading";

function ProductUpdate (){

    const params   = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState(null);


    useEffect(() => {
        async function getData() {
            try {
                const products = await fetch("/api/v1/products/" + params.cate_url + "/" + params.title_url);
                if(products.status === 404) {
                    navigate("/employes/not-found");
                }
                if(products.status === 200){
                    const json = await products.json();
                    setProducts(json);
                }
                               
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, []);

                
                
    return (
        <>
            <Link to="/employes/stock"><p className="previous_page">Retour à la liste des produits</p></Link>

            {!products ? (
                    <Loading/>

                ) : ( products.map( product =>
                    <div className="product_page">
                        <div className="shop">

                            <img className="product_image" src={require("../../../assets/img/store/" + product.file_name1)} alt={product.caption1}/>

                            <article className="product_description">
                                <h2 className="product_name">{product.title}</h2>
                                <p className="price"><strong>{product.price}€</strong></p>
                                <p className="color"><strong>Couleur : {product.color}</strong></p>

                            </article>
                        </div>


                    </div>
                    ))}


        </>
    )
};


export default ProductUpdate;