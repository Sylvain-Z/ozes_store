import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck , faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function ProductUpdateCate (){

    const params   = useParams();

    const [subcate, setSubcate]                 = useState(null); // A) sert à afficher la nomenclature des catégories dans le form_advise
    
    const [subcategorie_id, setSubcategorie_id] = useState(null); // B) sert à remplir le formulaire avec la subcategories correspondante
    const [product_id, setProduct_id]           = useState(null); // b) sert au findByVelue du controller

    const [msg, setMsg] = useState(null);

    const [isShown, setIsShown] = useState(false); // infobulle

    useEffect(() => {
        async function getData() {
            try {
                const subcate = await fetch("/api/v1/products/subcate"); // A)
                if (subcate.status === 200) {
                    const json = await subcate.json();
                    setSubcate(json.datas);
                }
                const subcategorie_id = await fetch("/api/v1/products/prod_subcate/" + params.id); // B)
                if (subcategorie_id.status === 200) {
                    const json = await subcategorie_id.json();
                    setSubcategorie_id(json[0].subcategorie_id);
                    setProduct_id(json[0].product_id);
                }

            } catch (error) {
            throw Error(error);
            }
        }
        getData();
        }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`/api/v1/products/update-subcate/`+ params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id , subcategorie_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
    }
    
    return (
        <>
                <section className="form_section">

                <h3 className="form_title read">Modifier la catégorie</h3>

                <form onSubmit={handleSubmit}>

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
                        {/* <p className='sizes_title'>{subcate.title}</p> */}
                        <input
                            placeholder="Catégorie"
                            type="text"
                            name="subcategorie_id"
                            value={subcategorie_id}
                            onChange={(e) => setSubcategorie_id(e.target.value)}
                        />
                        
                        {msg && <p className="msg_green">{msg}</p>}

                        <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                    </form>
                            
                </section>

        </>
                            
    )
};


export default ProductUpdateCate;