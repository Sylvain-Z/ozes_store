import { Link , useNavigate, useParams } from "react-router-dom";
import { useEffect , useState } from "react";

import Loading from "../../../Containers/Loading";
import ProductUpdateInfos from "./productUpdateInfos";
import ProductAddSizes from "./productAddSizes";
import ProductUpdateCate from "./productUpdateCate";
import ProductUpdatePic from "./productUpdatePic";

function ProductUpdate (){

    const navigate = useNavigate();
    const params   = useParams();

    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const products = await fetch("/api/v1/products/one_full/" + params.id);
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
            {!products ? (
                    <Loading/>

                ) : ( products.map( product =>

                    <>
                        <section className="form_section">

                            <h3 className="form_title read">Modifier</h3>
                            <h3 className="form_title read">{product.title}</h3>

                            <p className="form_advise">
                                        <em>Laisser vide les champs non pertinents</em></p>

                                <img className="form_image" src={require("../../../../../assets/img/store/" + product.file_name)} alt={product.caption}/>

                        </section>

                        <ProductUpdateInfos products={products} />

                        <ProductAddSizes />

                        <ProductUpdateCate />

                        <ProductUpdatePic />


                        </>
                            
                    ))}


        </>
    )
};


export default ProductUpdate;