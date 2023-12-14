import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FETCH_URL } from '../../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function ProductUpdateCate() {

    const params = useParams();

    const [subcate, setSubcate] = useState(null); // A) sert à afficher la nomenclature des catégories dans le form_advise

    const [subcategorie_id, setSubcategorie_id] = useState(null); // B) sert à remplir le formulaire avec la subcategories correspondante
    const [subcate_title, setSubcate_title] = useState(null); // B) sert à afficher la subcategories associée actuelle
    const [product_id, setProduct_id] = useState(null); // b) sert au findByVelue du controller

    const [msg, setMsg] = useState(null);

    const [isShown, setIsShown] = useState(false); // infobulle avec légenge masquée

    useEffect(() => {
        async function getData() {
            try {
                const subcate = await fetch(FETCH_URL + "products/subcate"); // A)
                if (subcate.status === 200) {
                    const json = await subcate.json();
                    setSubcate(json.datas);
                }
                const subcategorie_id = await fetch(FETCH_URL + "products/prod_subcate/" + params.id); // B)
                if (subcategorie_id.status === 200) {
                    const json = await subcategorie_id.json();
                    setSubcategorie_id(json[0].subcategorie_id);
                    setProduct_id(json[0].product_id);
                    setSubcate_title(json[0].subcate_title);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, [subcate_title]);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "products/update-subcate/" + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id, subcategorie_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setTimeout(() => {
            setMsg("")
        }, 5000)
    }

    return (
        <>
            <section className="form_section">

                <h3 className="form_title read">Modifier la catégorie</h3>

                <form onSubmit={handleSubmit}>

                    <FontAwesomeIcon icon={faCircleInfo} size="sm" className="faInfoBulle"  // infobulle avec légenge masquée
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                    />
                    {isShown && (
                        <div className='infobulle_ctn'>
                            <div className='infobulle'>
                                {!subcate ? (
                                    <><p>Créer d'abord une catégorie</p></>
                                ) : (subcate.map(subcat =>
                                    <p key={subcat.id}>
                                        {subcat.id} : {subcat.subcate_title}
                                    </p>
                                ))}
                            </div>
                        </div>)}
                    <p className='cate_title'>{subcate_title}</p>
                    <input
                        placeholder="Catégorie"
                        type="text"
                        name="subcategorie_id"
                        value={subcategorie_id}
                        onChange={(e) => setSubcategorie_id(e.target.value.replace(/[^0-9]/g, ''))}
                    />

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                </form>

            </section>

        </>

    )
};


export default ProductUpdateCate;