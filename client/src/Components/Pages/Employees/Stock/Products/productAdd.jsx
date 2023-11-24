import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductAdd (){

    const navigate = useNavigate();

    const [reference, setReference]             = useState(null);
    const [title, setTitle]                     = useState(null);
    const [title_url, setTitle_url]             = useState(null);
    const [description, setDescription]         = useState(null);
    const [price, setPrice]                     = useState(null);
    const [color, setColor]                     = useState(null);
    const [shape, setShape]                     = useState(null);
    const [gender, setGender]                   = useState(null);
    const [model_info, setModel_info]           = useState(null);
    const [material, setMaterial]               = useState(null);
    const [infosup, setInfosup]                 = useState(null);
    const [infosupplus, setInfosupplus]         = useState(null);
    const [madeplace, setMadeplace]             = useState(null);

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/products/add-product", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference , title , title_url , description , price , color , shape , gender , model_info , material , infosup , infosupplus , madeplace }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
        
        if (res.status === 201) {
            setTimeout(()=>{
                navigate("/employes/stock/attribuer-sous-catégorie");
            }, 2000)
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
                    
                    <label for="reference">Référence</label>
                    <input
                        placeholder="Référence du produit"
                        type="text"
                        name="reference"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                    />
                    <label for="title">Nom du produit</label>
                    <input
                        placeholder="Nom du produit"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label for="title_url">Nom pour url</label>
                    <input
                        placeholder="Nom pour url ( - ou _ acceptés )"
                        type="text"
                        name="title_url"
                        value={title_url}
                        onChange={(e) => setTitle_url(e.target.value)}
                        pattern="^\S*$"
                        title="L'espace n'est pas autorisé."
                    />
                    <label for="description">Description du produit</label>
                    <textarea className="form_input textarea"
                        placeholder="Description du produit"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label for="price">Prix</label>
                    <input
                        placeholder="Prix"
                        type="text"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label for="color">Couleur</label>
                    <input
                        placeholder="Couleur"
                        type="text"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <label for="shape">Coupe du produit</label>
                    <input
                        placeholder="Coupe du produit"
                        type="text"
                        name="shape"
                        value={shape}
                        onChange={(e) => setShape(e.target.value)}
                    />
                    <label for="gender">Genre</label>
                    <input
                        placeholder="Genre"
                        type="text"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label for="model_info">Information sur le modèles</label>
                    <input
                        placeholder="Information sur le modèles"
                        type="text"
                        name="model_info"
                        value={model_info}
                        onChange={(e) => setModel_info(e.target.value)}
                    />
                    <label for="material">Matière</label>
                    <input
                        placeholder="Matière"
                        type="text"
                        name="material"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                    />
                    <label for="infosup">Informations supplémentaire</label>
                    <textarea className="form_input textarea"
                        placeholder="Informations supplémentaire"
                        type="text"
                        name="infosup"
                        value={infosup}
                        onChange={(e) => setInfosup(e.target.value)}
                    />
                    <label for="infosupplus">Informations supplémentaire</label>
                    <textarea className="form_input textarea"
                        placeholder="Informations supplémentaire"
                        type="text"
                        name="infosupplus"
                        value={infosupplus}
                        onChange={(e) => setInfosupplus(e.target.value)}
                    />
                    
                    <label for="madeplace">Lieu de fabrication</label>
                    <input
                        placeholder="Lieu de fabrication"
                        type="text"
                        name="madeplace"
                        value={madeplace}
                        onChange={(e) => setMadeplace(e.target.value)}
                    />

                    {msg && <p className="msg_red">{msg}</p>}
                    {msg2 && <p className="msg_green">{msg2}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                    <button type="button" onClick={() => window.location.href =`/employes/stock`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                </form>



            </section>


        </>
    )
};


export default ProductAdd;