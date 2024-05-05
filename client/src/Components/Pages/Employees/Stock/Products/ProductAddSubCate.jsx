import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductAddSubCate() {

    const navigate = useNavigate();

    const [isShown, setIsShown] = useState(false); // gère la dissimulation et l'apparition de l'infobulle

    const [product_id, setProduct_id] = useState(null);  // stocke l'id du dernier produit ajouté
    const [id, setId] = useState("");  // state pour injecter dans la fonction du boutton d'annulation de la création du produit
    const [subcate, setSubcate] = useState("");

    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getLastProductIdSubCate() {
            try {
                const product_id = await fetch(FETCH_URL + "products/last-product_id"); // récupère l'id du dernier produit ajouté 

                if (product_id.status === 200) {
                    const json = await product_id.json();
                    setProduct_id(json[0].id); // récupère l'id du dernier produit ajouté pour l'injecter automatiquement au formulaire
                    setId(json[0].id); // récupère l'id du dernier produit ajouté pour injecter dans la fonction du boutton d'annulation de la création du produit
                }
                const subcate = await fetch(FETCH_URL + "products/subcate");
                if (subcate.status === 200) {
                    const json = await subcate.json();
                    setSubcate(json.datas);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getLastProductIdSubCate();
    }, [product_id, subcate]);


    const [subcategorie_id, setSubcategorie_id] = useState(null);

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "products/add-subcategorie", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
            body: JSON.stringify({ product_id, subcategorie_id }),
        });
        const json = await res.json();
        setMsg(json.msg); // controller AddSubCategories

        if (res.status === 201) {
            navigate("/employes/stock/ajouter-image")
        }
    }
    async function handleDeleteLast(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "products/delete/" + id, { // supprime le produit qui vient d'être ajouté
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
            body: JSON.stringify({ id }),
        });
        const json = await res.json();
        setMsg2(json.msg2); // controller DeleteProduct

        if (res.status === 201) {
            setTimeout(() => {
                navigate("/employes/stock");
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
                                ) : (subcate.map(subcat =>
                                    <p key={subcat.id}>
                                        {subcat.id} : {subcat.subcate_title}
                                    </p>
                                ))}
                            </div>
                        </div>)}

                    <p className="form_advise">
                        <em>L'association à une sous-catégorie est obligatoire</em></p>

                    <input
                        required
                        placeholder="Catégorie"
                        type="text"
                        name="subcategorie_id"
                        value={subcategorie_id}
                        onChange={(e) => setSubcategorie_id(e.target.value.replace(/[^0-9]/g, ''))}
                        title="Si la sous catégorie n'existe pas, créez là avant"
                    />

                    {msg && <p className="msg_green">{msg}</p>}
                    {msg2 && <p className="msg_red">{msg2}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                    <button type="button" onClick={handleDeleteLast}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                </form>



            </section>


        </>
    )
};


export default ProductAddSubCate;