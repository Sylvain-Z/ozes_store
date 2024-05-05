import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function ProductUpdatePic() {

    const params = useParams();

    const [prodImages, setProdImages] = useState(null); // récupère les images par rapport au product id
    
    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getProductImages() {
            try {
                const prodImages = await fetch(FETCH_URL + "pictures/products/" + params.id);

                if (prodImages.status === 200) {
                    const json = await prodImages.json();
                    setProdImages(json);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getProductImages();
    }, [prodImages]);

    const [image, setImage] = useState(null); // gère le formulaire
    const [caption, setCaption] = useState(""); // gère le formulaire
    const [product_id, setProduct_id] = useState(params.id);  // récupère l'id du produit dans l'url pour envoyer l'information dans la query

    const [msg, setMsg] = useState("");

    async function handleUpload(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        const productId = params.id;
        formData.append('product_id', productId)
        const alt = caption;
        formData.append('caption', alt)

        try {
            const res = await fetch(FETCH_URL + "pictures/add-pictures/" + params.id, {  // ajoute l'image par rapport au product id
                headers: {
                    enctype: "multipart/form-data",
                    'Authentication': `Bearer ${TOKEN_EMPL}`,
                },
                method: 'POST',
                body: formData,
            });
            const json = await res.json();
            setMsg(json.msg);

        } catch (error) {
            console.error('Erreur lors de l\'upload :', error.message);
        }
    };

    const  handleDelete = async (productId, pictureId, pictureFileName) => {
        const confirmed = window.confirm("Êtes-vous sûr de supprimer cette image ?");
        if (confirmed) {
            const res = await fetch(FETCH_URL + "pictures/delete/" + productId + "/" + pictureId, { // supprime l'image en fonction de l'id du produit et de l'id de l'image
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `Bearer ${TOKEN_EMPL}`,
                },
                body: JSON.stringify({ productId, pictureId , pictureFileName }),
            });
        const json = await res.json();
        setMsg(json.msg);
        }
      };

    return (

        <section className="form_section">

            <h3 className="form_title read">Ajouter une image</h3>

            <p className="form_advise">
                <em>Un produit doit toujours avoir au moins une image, veillez à ajouter une image avant de supprimer la seule image du produit</em></p>

            <div className="display_update_images">
                {!prodImages ? (
                    <p className='update_images_title'>Pas d'image pour ce produit</p>
                ) : (prodImages.map(prodImage =>
                    <>
                        <div className='update_images_ctn' key={prodImage.id}>
                            <img className="update_images" src={`/${prodImage.file_name}`} alt={prodImage.caption} />
                            <button className="faTrashCan" onClick={() => handleDelete(prodImage.product_id, prodImage.id, prodImage.file_name)}><FontAwesomeIcon icon={faTrashCan} className="fontawesomeRed" size="xs" /></button>
                        </div>
                    </>
                ))}
            </div>


            <form onSubmit={handleUpload}>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

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
    );
};

export default ProductUpdatePic;