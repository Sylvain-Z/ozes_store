import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import AddCategories from "./Addcategories";
import AddSubcategories from "./AddSubcategories";

function Categories() {

    const [inputHidden, setInptuHidden] = useState(false); // gère la dissimulation et l'apparition des pictogrammes faTrashCan 
    const toggleInput = () => setInptuHidden(!inputHidden);

    const navigate = useNavigate();
    const [categories, setCategories] = useState(null);  // récupère toutes les catégories en base de données
    const [subcategories, setSubcategories] = useState(null); // récupère toutes les sous catégories en base de données

    useEffect(() => {
        async function getCateAndSubCate() {
            try {
                const TOKEN_EMPL = getItemWithExpiration('authe');
                const categories = await fetch(FETCH_URL + "categories/categories",{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                      },
                });
                if (categories.status === 404) {
                    navigate("/employes/not-found");
                }
                if (categories.status === 200) {
                    const json = await categories.json();
                    setCategories(json.datas);
                }
                const subcategories = await fetch(FETCH_URL + "categories/subcategories",{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                      },
                });
                if (subcategories.status === 404) {
                    navigate("/employes/not-found");
                }
                if (subcategories.status === 200) {
                    const json = await subcategories.json();
                    setSubcategories(json.datas);
                }

            } catch (error) {
                throw Error(error);
            }
        }
        getCateAndSubCate();
    }, [categories, subcategories]); // met à jour l'affichage du composant dès que la catégorie ou la sous catégorie est créée ou supprimée

    return (

        <>
            <Link to="/employes/stock"><p className="previous_page">Retour</p></Link>

            <section className="categories">

                <h2>Catégories</h2>

                <div className='categories_actions'>
                    <AddCategories />
                    <AddSubcategories categories={categories} />
                </div>

                <div className='cate_display'>
                    <p className='title_p'>Catégories</p>
                    {!categories ? (
                        <>
                            <p>Pas de catégories existanttes</p>
                        </>
                    ) : (categories.map(categorie =>
                        <>
                            <div className='cate' key={categorie.id}>
                                <p className='cate_title'>{categorie.cate_title}</p>

                                <Link to={`/employes/stock/categories/categories/delete/${categorie.id}`} className={!inputHidden ? "hidden" : "faTrashCan"}><p ><FontAwesomeIcon icon={faTrashCan} size="xs" className="fontawesomeRed " /></p></Link>
                            </div>

                        </>
                    ))}
                </div>

                <div className='cate_display'>
                    <p className='title_p'>Sous-catégories</p>
                    {!subcategories ? (
                        <>
                            <p>Pas de sous-catégories existanttes</p>
                        </>
                    ) : (subcategories.map(subcategorie =>
                        <>
                            <div className='cate' key={subcategorie.id}>
                                <p className='cate_title'>{subcategorie.subcate_title}</p>
                                <Link to={`/employes/stock/categories/subcategories/delete/${subcategorie.id}`} className={!inputHidden ? "hidden" : "faTrashCan"}><p ><FontAwesomeIcon icon={faTrashCan} size="xs" className="fontawesomeRed " /></p></Link>
                            </div>

                        </>
                    ))}
                </div>

                <div className='categories_actions'>
                    <div className='form_reserve'>
                        <button type="button" className='delete' onClick={toggleInput}>
                            <p className='reserve_btn red'><FontAwesomeIcon icon={faTrashCan} size="xs" className="faIcon" />Supprimer</p>
                        </button>
                    </div>
                </div>
            </section>

        </>
    )
};

export default Categories;