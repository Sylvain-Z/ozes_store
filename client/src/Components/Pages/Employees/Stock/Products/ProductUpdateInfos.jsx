import { useParams } from "react-router-dom";
import { useState } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../../Containers/Loading/Index";

function ProductUpdate({ product }) {

    const params = useParams();

    const id = product[0].id;  // id sert au handleSubmit uniquement donc pas de state nécessaire // stockent les infos du produit pour injecter dans les inputs
    const [reference, setReference] = useState(product[0].reference);
    const [title, setTitle] = useState(product[0].title);
    const [title_url, setTitle_url] = useState(product[0].title_url);
    const [description, setDescription] = useState(product[0].description);
    const [price, setPrice] = useState(product[0].price);
    const [color, setColor] = useState(product[0].color);
    const [shape, setShape] = useState(product[0].shape);
    const [gender, setGender] = useState(product[0].gender);
    const [model_info, setModel_info] = useState(product[0].model_info);
    const [material, setMaterial] = useState(product[0].material);
    const [infosup, setInfosup] = useState(product[0].infosup);
    const [infosupplus, setInfosupplus] = useState(product[0].infosupplus);
    const [madeplace, setMadeplace] = useState(product[0].madeplace);

    const [msg, setMsg] = useState("");
    
    const TOKEN_EMPL = getItemWithExpiration('authe');

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "products/update/" + params.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
            body: JSON.stringify({ id, reference, title, title_url, description, price, color, shape, gender, model_info, material, infosup, infosupplus, madeplace }),
        });
        const json = await res.json();
        setMsg(json.msg);
    }

    return (
        <>
            {!product ? (
                <Loading />
            ) : (
                <>
                    <section className="form_section">

                        <p className="form_advise">
                            <em>Laisser vide les champs non pertinents</em></p>

                        <form onSubmit={handleSubmit}>

                            <label htmlFor="reference">Référence *</label>
                            <input
                                required
                                placeholder="Référence du produit"
                                type="text"
                                name="reference"
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                            />
                            <label htmlFor="title">Nom du produit *</label>
                            <input
                                required
                                placeholder="Nom du produit"
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="title_url">Nom pour url *</label>
                            <input
                                required
                                placeholder="Nom pour url ( - ou _ acceptés )"
                                type="text"
                                name="title_url"
                                value={title_url}
                                onChange={(e) => setTitle_url(e.target.value.replace(/[^a-zA-Z_-]/g, ''))}
                                title="L'espace n'est pas autorisé."
                            />
                            <label htmlFor="description">Description du produit *</label>
                            <textarea className="form_input textarea"
                                required
                                placeholder="Description du produit"
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="price">Prix *</label>
                            <input
                                required
                                placeholder="Prix"
                                type="text"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <label htmlFor="color">Couleur</label>
                            <input
                                placeholder="Couleur"
                                type="text"
                                name="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <label htmlFor="shape">Coupe du produit</label>
                            <input
                                placeholder="Coupe du produit"
                                type="text"
                                name="shape"
                                value={shape}
                                onChange={(e) => setShape(e.target.value)}
                            />
                            <label htmlFor="gender">Genre</label>
                            <input
                                placeholder="Genre"
                                type="text"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="model_info">Information sur le modèle</label>
                            <input
                                placeholder="Information sur le modèles"
                                type="text"
                                name="model_info"
                                value={model_info}
                                onChange={(e) => setModel_info(e.target.value)}
                            />
                            <label htmlFor="material">Matière *</label>
                            <input
                                required
                                placeholder="Matière"
                                type="text"
                                name="material"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                            <label htmlFor="infosup">Informations supplémentaires</label>
                            <textarea className="form_input textarea"
                                placeholder="Informations supplémentaires"
                                type="text"
                                name="infosup"
                                value={infosup}
                                onChange={(e) => setInfosup(e.target.value)}
                            />
                            <label htmlFor="infosupplus">Informations supplémentaires</label>
                            <textarea className="form_input textarea"
                                placeholder="Informations supplémentaires"
                                type="text"
                                name="infosupplus"
                                value={infosupplus}
                                onChange={(e) => setInfosupplus(e.target.value)}
                            />
                            <label htmlFor="madeplace">Lieu de fabrication</label>
                            <input
                                placeholder="Lieu de fabrication"
                                type="text"
                                name="madeplace"
                                value={madeplace}
                                onChange={(e) => setMadeplace(e.target.value)}
                            />

                            {msg && <p className="msg_green">{msg}</p>}

                            <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>

                        </form>

                    </section>
                </>
            )}
        </>
    )
};


export default ProductUpdate;