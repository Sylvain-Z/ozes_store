import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductAdd (){

    const navigate = useNavigate();

    const [reference, setReference] = useState(null);
    const [stock_quantity, setStock_quantity] = useState(null);
    const [title, setTitle] = useState(null);
    const [title_url, setTitle_url] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [color, setColor] = useState(null);
    const [shape, setShape] = useState(null);
    const [gender, setGender] = useState(null);
    const [model_info, setModel_info] = useState(null);
    const [material, setMaterial] = useState(null);
    const [material_style, setMaterial_style] = useState(null);
    const [infosup, setInfosup] = useState(null);
    const [infosupplus, setInfosupplus] = useState(null);
    const [madeplace, setMadeplace] = useState(null);

    const [msg, setMsg] = useState(null);

    /* function noSpaces (e) {
        if(e.keyCode==32 || e.key==" " || e.code==="Space") return false;
    } */
    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/products/add-product", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference , stock_quantity , title , title_url , description , price , color , shape , gender , model_info , material , material_style , infosup , infosupplus , madeplace }),
        });
        const json = await res.json();
        setMsg(json.msg);
        
        if (res.status === 201) {
            navigate("/employes/stock/add-categorie")
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

                    <input
                        placeholder="Référence du produit"
                        type="text"
                        name="reference"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                    />
                    <input
                        placeholder="Quantité en stock"
                        type="text"
                        name="stock_quantity"
                        value={stock_quantity}
                        onChange={(e) => setStock_quantity(e.target.value)}
                    />
                    <input
                        placeholder="Nom du produit"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Nom pour url (sans espace - ou _ acceptés)"
                        type="text"
                        name="title_url"
                        value={title_url}
                        onChange={(e) => setTitle_url(e.target.value)}
                        // onKeyDown={noSpaces}
                    />
                    {/* <textaera className="form_input textarea" */}
                    <input
                        placeholder="Description du produit"
                        /* type="text" */
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Prix"
                        type="text"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        placeholder="Couleur"
                        type="text"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <input
                        placeholder="Coupe du produit"
                        type="text"
                        name="shape"
                        value={shape}
                        onChange={(e) => setShape(e.target.value)}
                    />
                    <input
                        placeholder="Genre"
                        type="text"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <input
                        placeholder="Information sur le modèles"
                        type="text"
                        name="model_info"
                        value={model_info}
                        onChange={(e) => setModel_info(e.target.value)}
                    />
                    <input
                        placeholder="Matière"
                        type="text"
                        name="material"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                    />
                    <input
                        placeholder="classe css ('bio', 'bronze' ou 'silver')"
                        type="text"
                        name="material_style"
                        value={material_style}
                        onChange={(e) => setMaterial_style(e.target.value)}
                    />
                    {/* <textaera className="form_input textarea" */}
                    <input
                        placeholder="Informations supplémentaire"
                        /* type="text" */
                        name="infosup"
                        value={infosup}
                        onChange={(e) => setInfosup(e.target.value)}
                    />
                    {/* <textaera className="form_input textarea" */}
                    <input
                        placeholder="Informations supplémentaire"
                        /* type="text" */
                        name="infosupplus"
                        value={infosupplus}
                        onChange={(e) => setInfosupplus(e.target.value)}
                    />
                    <input
                        placeholder="Lieu de fabrication"
                        type="text"
                        name="madeplace"
                        value={madeplace}
                        onChange={(e) => setMadeplace(e.target.value)}
                    />

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                    <button type="button" onClick={() => window.location.href =`/employes/stock/add-categorie`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                </form>



            </section>


        </>
    )
};


export default ProductAdd;