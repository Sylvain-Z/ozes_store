import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function ProductPicAdd (){

    const navigate = useNavigate();

    const [lastProductID, setLastProductID] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const lastProductID = await fetch("/api/v1/products/last-product_id");
            
                if (lastProductID.status === 200) {
                    const json = await lastProductID.json();
                    setLastProductID(json);
                }
            } catch (error) {
            throw Error(error);
            }
        }
        getData();
        }, []);


    const [file_name1, setFile_name1] = useState(null);
    const [caption1, setCaption1] = useState(null);
    const [file_name2, setFile_name2] = useState(null);
    const [caption2, setCaption2] = useState(null);
    const [file_name3, setFile_name3] = useState(null);
    const [caption3, setCaption3] = useState(null);
    const [file_name4, setFile_name4] = useState(null);
    const [caption4, setCaption4] = useState(null);
    const [file_name5, setFile_name5] = useState(null);
    const [caption5, setCaption5] = useState(null);
    const [product_id, setProduct_id] = useState(null);

    const [msg, setMsg] = useState(null);

    /* function noSpaces (e) {
        if(e.keyCode==32 || e.key==" " || e.code==="Space") return false;
    } */
    
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
            navigate("/employes/stock")
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
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name1"
                        value={file_name1}
                        onChange={(e) => setFile_name1(e.target.value)}
                    />
                    <input
                        placeholder="alt (légende de l'image)"
                        type="text"
                        name="caption1"
                        value={caption1}
                        onChange={(e) => setCaption1(e.target.value)}
                    />
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name2"
                        value={file_name2}
                        onChange={(e) => setFile_name2(e.target.value)}
                    />
                    <input
                        placeholder="alt (légende de l'image)"
                        type="text"
                        name="caption2"
                        value={caption2}
                        onChange={(e) => setCaption2(e.target.value)}
                    />
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name3"
                        value={file_name3}
                        onChange={(e) => setFile_name3(e.target.value)}
                    />
                    <input
                        placeholder="alt (légende de l'image)"
                        type="text"
                        name="caption3"
                        value={caption3}
                        onChange={(e) => setCaption3(e.target.value)}
                    />
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name4"
                        value={file_name4}
                        onChange={(e) => setFile_name4(e.target.value)}
                    />
                    <input
                        placeholder="alt (légende de l'image)"
                        type="text"
                        name="caption4"
                        value={caption4}
                        onChange={(e) => setCaption4(e.target.value)}
                    />
                    <input
                        placeholder="Nom de l'image (ex : image.jpg)"
                        type="text"
                        name="file_name5"
                        value={file_name5}
                        onChange={(e) => setFile_name5(e.target.value)}
                    />
                    <input
                        placeholder="alt (légende de l'image)"
                        type="text"
                        name="caption5"
                        value={caption5}
                        onChange={(e) => setCaption5(e.target.value)}
                    />

                    {!lastProductID ? (
                                        <></>
                                    ) : (
                                            <p className="form_advise">
                                                <em>L'ID de l'article ajouté est {lastProductID[0].id}</em></p>
                                        )}  
                    <input
                        placeholder="ID du produit"
                        type="text"
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


export default ProductPicAdd;