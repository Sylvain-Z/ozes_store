import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function DeleteCategorie() {

    const navigate = useNavigate();
    const params = useParams();

    const [id, setId] = useState("");
    const [categorie, setCategorie] = useState(null);

    const TOKEN_EMPL = getItemWithExpiration('authe');
    
    useEffect(() => {
        async function getCategorieDelete() {
            try {
                const categorie = await fetch(FETCH_URL + "categories/categories/" + params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                      },
                }); // récupère les information de la catégorie en fonction de son id pour afficher à l'utilisateur la confirmation de suppression concernant ce qu'il souhaite supprimer
                if (categorie.status === 404) {
                    navigate("/employes/not-found");
                }
                if (categorie.status === 200) {
                    const json = await categorie.json();
                    setCategorie(json);
                    setId(json[0].id)
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getCategorieDelete();
    }, []);


    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "categories/categories/delete/" + params.id, { // supprime la catégorie en fonction de son id
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
            body: JSON.stringify({ id }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            navigate("/employes/stock/categories");
        }
    }

    return (
        <>

            <Link to="/employes/stock/categories"><p className="previous_page">Retour à la liste des produits</p></Link>

            <section className="form_section categories">

                <h3 className="form_title update">Suppression d'une catégorie</h3>

                <p className="msg_red">Êtes-vous sûr de vouloir cette catégorie ? Cette action est irréversible</p>

                <form onSubmit={handleSubmit}>

                    {!categorie ? (
                        <p>Catégorie non trouvé</p>
                    ) : (
                        <>
                            <div className="delete_fig">
                                <p className='cate_title'>{categorie[0].cate_title}</p>
                            </div>

                        </>
                    )}

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                    <Link to={`/employes/stock/categories`} className="button_retour_rouge"><p ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></p></Link>
                </form>

            </section>

        </>
    )


}

export default DeleteCategorie;