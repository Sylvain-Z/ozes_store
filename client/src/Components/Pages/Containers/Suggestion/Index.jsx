import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { fetchData } from '../../../../assets/api';

import Loading from "../Loading/Index";

function Suggestion() {

    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function getProductSuggestion() {
            try {
                const products = await fetchData(`products/random`) // récupère aléatoirement 4 produits de la base de données
                setProducts(products.datas);

            } catch (error) {
                throw Error(error);
            }
        }
        getProductSuggestion();
    }, []);

    return (
        <>
            <article className="suggestion_ctn">
                <h4 className='suggestion_title'>Suggestions de produits</h4>
                <div className="suggestion">
                    {!products ? (
                        <Loading />
                    ) : (products.map(product =>

                        <Link to={`/le_store/${product.title_url}/${product.id}`} className='suggestion_link' key={product.id}>
                            <img src={`/${product.file_name}`} alt={product.caption} />
                        </Link>
                    ))}
                </div>
            </article>
        </>
    )
}

export default Suggestion;