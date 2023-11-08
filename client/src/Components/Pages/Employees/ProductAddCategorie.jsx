import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductAddCategorie (){

    const navigate = useNavigate();

    const [lastProductID, setLastProductID] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const lastProductID = await fetch("/api/v1/products/last-product_id");
            
                if (lastProductID.status === 200) {
                    const json = await lastProductID.json();
                    setLastProductID(json);
                }
            } catch (error) {
            throw Error(error);
            }
        }
        getData();
        }, []);

    const [product_id, setProduct_id] = useState(null);
    const [subcategorie_id, setSubcategorie_id] = useState(null);

    const [msg, setMsg] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/products/add-subcategorie", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id , subcategorie_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        
        if (res.status === 201) {
            navigate("/employes/stock/add-imagesinfos")
        }
    }
                
    return (
        <>

            <section className="form_section">

                <h3 className="form_title read">Sélectionner sa catégorie</h3>

                <form onSubmit={handleSubmit}>

                {!lastProductID ? (
                                        <></>
                                    ) : (
                                            <p className="form_advise">
                                                <em>L'ID de l'article ajouté est {lastProductID[0].id}</em></p>
                                        )}
                    
                    <input
                        placeholder="ID du produit"
                        type="text"
                        name="product_id"
                        value={product_id}
                        onChange={(e) => setProduct_id(e.target.value)}
                    />
                    <p className="form_advise">
                            <em>Tapez 1 pour tshirts, 2 pour bagues</em></p>
                    <input
                        placeholder="Catégorie"
                        type="text"
                        name="subcategorie_id"
                        value={subcategorie_id}
                        onChange={(e) => setSubcategorie_id(e.target.value)}
                    />
                    
                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                    <button type="button" onClick={() => window.location.href =`/employes/stock`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                </form>



            </section>


        </>
    )
};


export default ProductAddCategorie;