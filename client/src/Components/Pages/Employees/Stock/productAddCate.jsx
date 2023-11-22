import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck , faCircleInfo , faDeleteLeft} from '@fortawesome/free-solid-svg-icons';

function ProductAddCate (){

    const navigate = useNavigate();
    
    const [isShown, setIsShown] = useState(false); // infobulle

    const [product_id, setProduct_id]   = useState(null);
    const [subcate, setSubcate]         = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const product_id = await fetch("/api/v1/products/last-product_id");

                if (product_id.status === 200) {
                    const json = await product_id.json();
                    setProduct_id(json[0].id);
                }
                const subcate = await fetch("/api/v1/products/subcate");
                if (subcate.status === 200) {
                    const json = await subcate.json();
                    setSubcate(json.datas);
                }
            } catch (error) {
            throw Error(error);
            }
        }
        getData();
        }, [product_id, subcate]);

    
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
            setTimeout(()=>{
                navigate("/employes/stock/attribuer-infos-images")
            }, 2000)
        }
    }
                
    return (
        <>

            <section className="form_section">

                <h3 className="form_title read">Sélectionner sa catégorie</h3>

                <form onSubmit={handleSubmit}>
                    
                    <input
                        disabled
                        placeholder="ID du produit"
                        type="hidden"
                        name="product_id"
                        value={product_id}
                        onChange={(e) => setProduct_id(e.target.value)}
                    />

                    <FontAwesomeIcon icon={faCircleInfo} size="s" className="faInfoBulle"
                            onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                        />
                        {isShown && (
                        <div className='infobulle_ctn'>
                            <div className='infobulle'>
                                {!subcate ? (
                                    <><p>Créer d'abord une catégorie</p></>
                                ) : ( subcate.map( sbc =>
                                    <p>
                                        {sbc.id} : {sbc.subcate_title}
                                    </p>
                                ))}
                            </div>
                        </div>)}

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


export default ProductAddCate;