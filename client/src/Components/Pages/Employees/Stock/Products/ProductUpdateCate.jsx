import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

function ProductUpdateCate() {

    const params = useParams();

    const [subcate, setSubcate] = useState(null); // A) sert à afficher la nomenclature des catégories dans le form_advise

    const [subcategorie_id, setSubcategorie_id] = useState(""); // B) sert à remplir le formulaire avec la subcategories correspondante
    const [subcate_title, setSubcate_title] = useState(""); // B) sert à afficher la subcategories associée actuelle
    const [product_id, setProduct_id] = useState(""); // b) sert au findByVelue du controller

    const [msg, setMsg] = useState("");

    const [isShown, setIsShown] = useState(false); // infobulle avec légenge masquée

    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getProductSubcateUpdate() {
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
        getProductSubcateUpdate();
    }, [subcate_title]);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "products/update-subcate/" + params.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
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

                <h3 className="form_title read">Modifier la sous-catégorie</h3>

                <form onSubmit={handleSubmit}>


                    <p className='cate_title'>{subcate_title}</p>
                    <select 
                        name="size"
                        className="form_input" 
                        onChange={(e) => setSubcategorie_id(e.target.value)}
                    >
                        <option value=""  selected disabled>Modifier la sous-catégorie</option>
                        {!subcate ? (
                        <>
                            <option>Créer d'abord une catégorie</option>
                        </>
                        ) : (subcate.map((subcat) => (
                            <option
                                key={subcat.id}
                                value={subcat.id}
                            >
                                {subcat.subcate_title}
                            </option>
                        ))
                        )}
                    </select>

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                </form>

            </section>

        </>

    )
};


export default ProductUpdateCate;