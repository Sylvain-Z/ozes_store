import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductAddPic (){

    const navigate = useNavigate();

    const [product_id, setProduct_id] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const product_id = await fetch("/api/v1/products/last-product_id");
            
                if (product_id.status === 200) {
                    const json = await product_id.json();
                    setProduct_id(json[0].id);
                }
            } catch (error) {
            throw Error(error);
            }
        }
        getData();
        }, []);


    const [file_name, setFile_name] = useState("");
    const [caption, setCaption] = useState("");

    const [msg, setMsg] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/products/add-pictures", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file_name , caption , product_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        
        if (res.status === 201) {
        setTimeout(()=>{
            navigate("/employes/stock")
        }, 2000)
        }
    }

    return (
        <>
            <section className="form_section">

                <h3 className="form_title read">Ajouter un article à la boutique</h3>

                <p className="form_advise">
                            <em>Laisser vide les champs non pertinents</em></p>

                <form onSubmit={handleSubmit}>

                    <p className="form_advise">
                            <em>Insérer les informations des images</em></p>
                    <label for="file_name">Nom de l'image principale</label>
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name"
                        value={file_name}
                        onChange={(e) => setFile_name(e.target.value)}
                        pattern="^\S*$"
                        title="L'espace n'est pas autorisé."
                    />
                    <label for="caption">Légende de l'image principale</label>
                    <input
                        placeholder="Légende"
                        type="text"
                        name="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />

                    <input
                        disabled
                        placeholder="ID du produit"
                        type="hidden"
                        name="product_id"
                        value={product_id}
                        onChange={(e) => setProduct_id(e.target.value)}
                    />

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                    <button type="button" onClick={() => window.location.href =`/employes/stock`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                </form>



            </section>


        </>
    )
};


export default ProductAddPic;