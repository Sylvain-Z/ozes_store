
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function DeletePicture() {

    const navigate = useNavigate();
    const params = useParams();

    const [pictures, setPictures] = useState(null);
    const [id, setID] = useState(null);
    const [product_id, setProduct_id] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const pictures = await fetch(FETCH_URL + "pictures/" + params.product_id + "/" + params.picture_id); // récupère l'image en fonction de l'id du produit et de l'id de l'image
                if (pictures.status === 404) {
                    navigate("/employes/not-found");
                }
                if (pictures.status === 200) {
                    const json = await pictures.json();
                    setPictures(json);
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
        const res = await fetch(FETCH_URL + "pictures/delete/" + params.product_id + "/" + params.picture_id, { // supprime l'image en fonction de l'id du produit et de l'id de l'image
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id, id }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            navigate("/employes/stock/actualiser/" + params.product_id);
        }
    }

    return (
        <>

            <Link to={`/employes/stock/actualiser/` + params.product_id}><p className="previous_page">Retour à la liste des produits</p></Link>

            <section className="form_section reserve">

                <h3 className="form_title update">Suppression d'une image</h3>

                <p className="msg_red">Êtes-vous sûr ? Cette action est irréversible</p>


                <p className="form_advise">
                    <em>Un produit doit toujours avoir au moins une image, vérifiez que cela soit le cas avant de confirmer</em></p>

                <form onSubmit={handleSubmit}>

                    {!pictures ? (
                        <p>Image non trouvée</p>
                    ) : (
                        <>
                            <div className="delete_fig">
                                <img className="update_images" src={`/${pictures[0].file_name}`} alt={pictures[0].caption} />
                            </div>

                        </>
                    )}

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                    <Link to={"/employes/stock/actualiser/" + params.product_id} className="button_retour_rouge"><p><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></p></Link>

                </form>



            </section>

        </>
    )


}

export default DeletePicture;