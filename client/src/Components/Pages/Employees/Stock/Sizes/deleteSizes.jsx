import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function DeleteSizes() {

    const navigate = useNavigate();
    const params = useParams();

    const [sizes, setSizes] = useState(null);
    const [id, setID] = useState(null);
    const [size_id, setSize_id] = useState("");
    const [product_id, setProduct_id] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const sizes = await fetch(FETCH_URL + "sizes/" + params.product_id + "/" + params.size_id); // récupère la taille en fonction de l'id du produit et de l'id de la taille
                if (sizes.status === 404) {
                    navigate("/employes/not-found");
                }
                if (sizes.status === 200) {
                    const json = await sizes.json();
                    setSizes(json);
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
        const res = await fetch(FETCH_URL + "sizes/delete/" + params.product_id + "/" + params.size_id, { // supprime la taille en fonction de l'id du produit et de l'id de la taille
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

                <h3 className="form_title update">Suppression d'une taille</h3>

                <p className="msg_red">Êtes-vous sûr ? Cette action est irréversible</p>
                <p className="form_advise">
                    <em>Un produit doit toujours avoir au moins une taille, vérifiez que cela soit le cas avant de confirmer</em></p>

                <form onSubmit={handleSubmit}>

                    {!sizes ? (
                        <p>Taille non trouvé</p>
                    ) : (
                        <>
                            <div className="delete_fig">
                                <p className='cate_title'>{sizes[0].label}</p>
                            </div>

                        </>
                    )}

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                    <button type="button" onClick={() => window.location.href = "/employes/stock/actualiser/" + params.product_id}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                </form>



            </section>

        </>
    )


}

export default DeleteSizes;