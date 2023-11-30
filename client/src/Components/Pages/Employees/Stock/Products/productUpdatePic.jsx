import { Link , useParams } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function ProductUpdatePic ({products}){

    const params   = useParams();

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

    const [file_name, setFile_name] = useState("");
    const [caption, setCaption] = useState("");
    const [product_id, setProduct_id] = useState("");
    
    useEffect(() => {
        async function getData() {
            try {
                const product_id = await fetch("/api/v1/products/pictures/"+ params.id);
            
                if (product_id.status === 200) {
                    const json = await product_id.json();
                    setFile_name(json[0].file_name);
                    setCaption(json[0].caption);
                    setProduct_id(json[0].product_id);
                }
            } catch (error) {
            throw Error(error);
            }
        }
        getData();
        }, []);


    const [msg, setMsg] = useState(null);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/products/update-pictures/"+ params.id , {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file_name , caption , product_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
    }

    return (
        <>
            <section className="form_section">

                <h3 className="form_title read">Image Principale</h3>

                <img className="form_image" src={`/assets/img/store/${products[0].file_name}`} alt={products[0].caption}/>

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

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>

                </form>
            </section>

            <Link to="/employes/stock"><p className="previous_page">Retour à la liste des produits</p></Link>

        </>
    )
};


export default ProductUpdatePic;