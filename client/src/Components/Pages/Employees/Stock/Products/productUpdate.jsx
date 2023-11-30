import { useNavigate, useParams } from "react-router-dom";
import { useEffect , useState } from "react";

import Loading from "../../../Containers/Loading/Index";
import PreviousPage from "./Components/PreviousPage";
import ProductUpdateInfos from "./ProductUpdateInfos";
import ProductAddSizes from "./ProductAddSizes";
import ProductUpdateCate from "./ProductUpdateCate";
import ProductAddPicForm from "./ProductAddPicForm";

function ProductUpdate (){

    const navigate = useNavigate();
    const params   = useParams();

    const [products, setProducts] = useState(null);
    
    const [ quantity, setQuantity ] = useState("");
    
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
                const quantity = await fetch("/api/v1/products/quantity/"+ params.id);
                if(quantity.status === 200){
                    const json = await quantity.json();
                    setQuantity(json);
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

                ) : (
                    <>
                        <section className="form_section">

                            <h3 className="form_title read">Modifier</h3>
                            <h3 className="form_title read">{products[0].title}</h3>
                            
                            {!quantity ? (<>Quantité en stock : inconnue</>) :(<><h3 className="form_title read">Quantité en stock : {quantity[0].total}</h3></>)}

                                <img className="form_image" src={`/${products[0].file_name}`} alt={products[0].caption}/>



                        </section>

                        <PreviousPage />

                        <ProductUpdateInfos products={products} />

                        <PreviousPage />

                        <ProductAddSizes />

                        <ProductUpdateCate />

                        <ProductAddPicForm />

                        <PreviousPage />

                        </>
                            
                    )}


        </>
    )
};


export default ProductUpdate;