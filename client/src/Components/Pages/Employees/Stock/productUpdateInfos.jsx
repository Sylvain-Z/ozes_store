import { Link , useNavigate, useParams } from "react-router-dom";
import { useEffect , useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';


import Loading from "../../Containers/Loading";

function ProductUpdate ({products}){

    const params   = useParams();
    const navigate = useNavigate();

    const [id, setId]                           = useState(null);
    const [reference, setReference]             = useState(null);
    const [stock_quantity, setStock_quantity]   = useState(null);
    const [title, setTitle]                     = useState(null);
    const [title_url, setTitle_url]             = useState(null);
    const [description, setDescription]         = useState(null);
    const [price, setPrice]                     = useState(null);
    const [color, setColor]                     = useState(null);
    const [shape, setShape]                     = useState(null);
    const [gender, setGender]                   = useState(null);
    const [model_info, setModel_info]           = useState(null);
    const [material, setMaterial]               = useState(null);
    const [material_style, setMaterial_style]   = useState(null);
    const [infosup, setInfosup]                 = useState(null);
    const [infosupplus, setInfosupplus]         = useState(null);
    const [madeplace, setMadeplace]             = useState(null);

    const [msg, setMsg] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const products = await fetch("/api/v1/products/one_full/" + params.id);
                if(products.status === 404) {
                    navigate("/employes/not-found");
                }
                if(products.status === 200){
                    const json = await products.json();
                    setId(json[0].id);
                    setReference(json[0].reference);
                    setStock_quantity(json[0].stock_quantity);
                    setTitle(json[0].title);
                    setTitle_url(json[0].title_url);
                    setDescription(json[0].description);
                    setPrice(json[0].price);
                    setColor(json[0].color);
                    setShape(json[0].shape);
                    setGender(json[0].gender);
                    setModel_info(json[0].model_info);
                    setMaterial(json[0].material);
                    setMaterial_style(json[0].material_style);
                    setInfosup(json[0].infosup);
                    setInfosupplus(json[0].infosupplus);
                    setMadeplace(json[0].madeplace);
                }
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`/api/v1/products/update/`+ params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id , reference , stock_quantity , title , title_url , description , price , color , shape , gender , model_info , material , material_style , infosup , infosupplus , madeplace }),
        });
        const json = await res.json();
        setMsg(json.msg);
    }                
                
    return (
        <>
            <p className="previous_page"><Link to="/employes/stock">Retour à la liste des produits</Link></p>

            {!products ? (
                    <Loading/>

                ) : ( products.map( product =>

                    <>
                        <section className="form_section">

                                    <form onSubmit={handleSubmit}>

                                    <label for="reference">Référence</label>
                                        <input
                                            placeholder="Référence du produit"
                                            type="text"
                                            name="reference"
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}
                                        />
                                        <label for="stock_quantity">Quantité</label>
                                        <input
                                            placeholder="Quantité en stock"
                                            type="text"
                                            name="stock_quantity"
                                            value={stock_quantity}
                                            onChange={(e) => setStock_quantity(e.target.value)}
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
                                        <label for="material_style">Classe css</label>
                                        <input
                                            placeholder="Classe css ('bio', 'bronze' ou 'silver')"
                                            type="text"
                                            name="material_style"
                                            value={material_style}
                                            onChange={(e) => setMaterial_style(e.target.value)}
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

                                        {msg && <p className="msg_green">{msg}</p>}

                                        <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                                        <button type="button" onClick={() => window.location.href =`/employes/stock`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                                    </form>

                        </section>
                        </>
                            
                    ))}


        </>
    )
};


export default ProductUpdate;