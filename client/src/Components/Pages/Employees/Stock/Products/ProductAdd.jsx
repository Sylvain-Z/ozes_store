import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductAdd() {

    const navigate = useNavigate();

    const [reference, setReference] = useState(null); // gère les inputs du formulaire
    const [title, setTitle] = useState("");
    const [title_url, setTitle_url] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [color, setColor] = useState("");
    const [shape, setShape] = useState("");
    const [gender, setGender] = useState("");
    const [model_info, setModel_info] = useState("");
    const [material, setMaterial] = useState("");
    const [infosup, setInfosup] = useState("");
    const [infosupplus, setInfosupplus] = useState("");
    const [madeplace, setMadeplace] = useState("");

    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const TOKEN_EMPL = getItemWithExpiration('authe');
        const res = await fetch(FETCH_URL + "products/add-product", { // insère le contenu du formulaire en base de donnée
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
            body: JSON.stringify({ reference, title, title_url, description, price, color, shape, gender, model_info, material, infosup, infosupplus, madeplace }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);

        if (res.status === 201) {
            navigate("/employes/stock/attribuer-sous-catégorie");
        }
    }

    return (
        <>
            <Link to="/employes/stock"><p className="previous_page">Retour à la liste des produits</p></Link>

            <section className="form_section">

                <h3 className="form_title read">Ajouter un article à la boutique</h3>

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
                        placeholder="Nom pour url"
                        type="text"
                        name="title_url"
                        value={title_url}
                        onChange={(e) => setTitle_url(e.target.value.replace(/[^a-zA-Z_-]/g, ''))}
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
                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
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
                    <label htmlFor="model_info">Information sur le modèles</label>
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
                    <label htmlFor="infosup">Informations supplémentaire</label>
                    <textarea className="form_input textarea"
                        placeholder="Informations supplémentaire"
                        type="text"
                        name="infosup"
                        value={infosup}
                        onChange={(e) => setInfosup(e.target.value)}
                    />
                    <label htmlFor="infosupplus">Informations supplémentaire</label>
                    <textarea className="form_input textarea"
                        placeholder="Informations supplémentaire"
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

                    {msg && <p className="msg_red">{msg}</p>}
                    {msg2 && <p className="msg_green">{msg2}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                    <Link to={`/employes/stock/`} className="button_retour_rouge"><p ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></p></Link>

                </form>



            </section>


        </>
    )
};


export default ProductAdd;