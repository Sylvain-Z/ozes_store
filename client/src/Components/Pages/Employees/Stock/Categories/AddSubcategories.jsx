import { useState } from 'react';

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleInfo, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function AddSubcategories({ categories }) {

    const [inputHidden, setInptuHidden] = useState(false);  // gère la dissimulation et l'apparition des inputs du formulaire
    const toggleInput = () => setInptuHidden(!inputHidden);

    const [isShown, setIsShown] = useState(false); // gère la dissimulation et l'apparition de l'infobulle

    const [subcate_title, setSubcate_title] = useState("");
    const [categorie_id, setCategorie_id] = useState("");
    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const TOKEN_EMPL = getItemWithExpiration('authe');
        const res = await fetch(FETCH_URL + "categories/add-subcategory", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
            body: JSON.stringify({ subcate_title, categorie_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
    };

    return (

        <>
            <form onSubmit={handleSubmit} className="form_reserve form_cate">
                <p onClick={toggleInput} className="reserve_btn"><FontAwesomeIcon icon={faCirclePlus} className='faIcon' />Sous-catégorie</p>

                <input
                    required
                    placeholder="Nouvelle sous-catégorie"
                    type={!inputHidden ? "hidden" : "text"}
                    name="subcate_title"
                    value={subcate_title}
                    onChange={(e) => setSubcate_title(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                />

                <input
                    required
                    placeholder="Catégorie associée"
                    type={!inputHidden ? "hidden" : "number"}
                    name="categorie_id"
                    value={categorie_id}
                    onChange={(e) => setCategorie_id(e.target.value.replace(/[^0-9]/g, ''))}
                />

                <FontAwesomeIcon icon={faCircleInfo} size="s" className={!inputHidden ? "hidden" : "faInfoBulle"}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                />
                {isShown && (
                    <div className='infobulle_ctn'>
                        <div className='infobulle'>
                            {!categories ? (
                                <><p>Créer d'abord une catégorie</p></>
                            ) : (categories.map(categorie =>
                                <p key={categorie.id}>
                                    {categorie.id} : {categorie.cate_title}
                                </p>
                            ))}
                        </div>
                    </div>)}


                {msg && <p className={!inputHidden ? "hidden" : "msg_red msg"}>{msg}</p>}
                {msg2 && <p className={!inputHidden ? "hidden" : "msg_green msg"}>{msg2}</p>}

                <button type="submit"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={!inputHidden ? "hidden" : "fontawesomeGreen msg"} /></button>
            </form>
        </>
    )


};

export default AddSubcategories;