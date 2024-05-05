import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function ProductAddPic() {

    const navigate = useNavigate();

    const [product_id, setProduct_id] = useState(""); // stocke l'id du dernier produit ajouté
    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getLastProductIdPic() {
            try {
                const product_id = await fetch(FETCH_URL + "products/last-product_id"); // récupère l'id du dernier produit ajouté 

                if (product_id.status === 200) {
                    const json = await product_id.json();
                    setProduct_id(json[0].id);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getLastProductIdPic();
    }, []);


    const [image, setImage] = useState(null); // gère le formulaires
    const [caption, setCaption] = useState(""); // gère le formulaires

    const [msg, setMsg] = useState(null);

    async function handleUpload(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        const productId = product_id;
        formData.append('product_id', productId)
        const alt = caption;
        formData.append('caption', alt)

        try {
            const res = await fetch(FETCH_URL + "pictures/add-pictures/" + product_id, {
                headers: {
                    enctype: "multipart/form-data",
                    'Authentication': `Bearer ${TOKEN_EMPL}`,
                },
                method: 'POST',
                body: formData,
            });
            const json = await res.json();
            setMsg(json.msg);
            if (res.status === 201) {
                navigate(`/employes/stock/actualiser/${product_id}`);
            }

        } catch (error) {
            console.error('Erreur lors de l\'upload :', error.message);
        }

    }

    return (
        <>
            <section className="form_section">

                <h3 className="form_title read">Ajouter une image au produit</h3>

                <form onSubmit={handleUpload}>

                    <p className="form_advise">
                        <em>L'ajout d'une image est obligatoire</em></p>

                    <label htmlFor="picture">Télécharger l'image *</label>
                    <input required type="file" name="picture" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                    <label htmlFor="caption">Légende de l'image *</label>
                    <input
                        required
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

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>

                </form>
            </section>
        </>
    )
};


export default ProductAddPic;