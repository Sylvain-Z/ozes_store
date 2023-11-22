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


    const [file_name1, setFile_name1] = useState("");
    const [caption1, setCaption1] = useState("");
    const [file_name2, setFile_name2] = useState("");
    const [caption2, setCaption2] = useState("");
    const [file_name3, setFile_name3] = useState("");
    const [caption3, setCaption3] = useState("");
    const [file_name4, setFile_name4] = useState("");
    const [caption4, setCaption4] = useState("");
    const [file_name5, setFile_name5] = useState("");
    const [caption5, setCaption5] = useState("");

    const [msg, setMsg] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/products/add-pictures", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file_name1 , caption1 , file_name2 , caption2 , file_name3 , caption3 , file_name4 , caption4 , file_name5 , caption5 , product_id }),
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
                    <label for="file_name1">Nom de l'image principale</label>
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name1"
                        value={file_name1}
                        onChange={(e) => setFile_name1(e.target.value)}
                        pattern="^\S*$"
                        title="L'espace n'est pas autorisé."
                    />
                    <label for="caption1">Légende de l'image principale</label>
                    <input
                        placeholder="Légende"
                        type="text"
                        name="caption1"
                        value={caption1}
                        onChange={(e) => setCaption1(e.target.value)}
                    />
                    <label for="file_name2">Nom de l'image</label>
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name2"
                        value={file_name2}
                        onChange={(e) => setFile_name2(e.target.value)}
                        pattern="^\S*$"
                        title="L'espace n'est pas autorisé."
                    />
                    <label for="caption2">Légende de l'image</label>
                    <input
                        placeholder="Légende"
                        type="text"
                        name="caption2"
                        value={caption2}
                        onChange={(e) => setCaption2(e.target.value)}
                    />
                    <label for="file_name3">Nom de l'image</label>
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name3"
                        value={file_name3}
                        onChange={(e) => setFile_name3(e.target.value)}
                        pattern="^\S*$"
                        title="L'espace n'est pas autorisé."
                    />
                    <label for="caption3">Légende de l'image</label>
                    <input
                        placeholder="Légende"
                        type="text"
                        name="caption3"
                        value={caption3}
                        onChange={(e) => setCaption3(e.target.value)}
                    />
                    <label for="file_name4">Nom de l'image</label>
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name4"
                        value={file_name4}
                        onChange={(e) => setFile_name4(e.target.value)}
                        pattern="^\S*$"
                        title="L'espace n'est pas autorisé."
                    />
                    <label for="caption4">Légende de l'image</label>
                    <input
                        placeholder="Légende"
                        type="text"
                        name="caption4"
                        value={caption4}
                        onChange={(e) => setCaption4(e.target.value)}
                    />
                    <label for="file_name5">Nom de l'image</label>
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name5"
                        value={file_name5}
                        onChange={(e) => setFile_name5(e.target.value)}
                        pattern="^\S*$"
                        title="L'espace n'est pas autorisé."
                    />
                    <label for="caption5">Légende de l'image</label>
                    <input
                        placeholder="Légende"
                        type="text"
                        name="caption5"
                        value={caption5}
                        onChange={(e) => setCaption5(e.target.value)}
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