import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Loading from "../Containers/Loading";

function ProductGalery(){
    
    const [ products, setProducts ] = useState(null);
    
    useEffect(() => {
            async function getData() {
                try {
                    const products = await (
                        await fetch("/api/v1/products/galery")
                    ).json();
                    setProducts(products.datas);
                            
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    return (
        <>
            <div className="shop">
                {!products ? (
                    <Loading/>
                ) : ( products.map( product =>

                        <div className='product_grid'>
                            <figure><Link to={`/le_store/${product.title_url}/${product.id}`}>
                                <img src={require("../../../assets/img/store/" + product.file_name)} alt={product.caption}/>
                                <figcaption>
                                    <p>{product.title}</p>
                                    <p>{product.price}€</p>
                                </figcaption></Link>
                            </figure>
                        </div>
                    ))}
            </div>
        </>
    )
}



export default ProductGalery;