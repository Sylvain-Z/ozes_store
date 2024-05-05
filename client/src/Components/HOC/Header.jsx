import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

import { FETCH_URL } from '../../assets/const';
import { getItemWithExpiration } from '../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import cart_empty from '../../assets/img/cart_empty.png';
import user_out from '../../assets/img/user_out.png';
import user_in from '../../assets/img/user_in.png';
import user_logout from '../../assets/img/user_logout.png';
import LogoPeQ from '../../assets/img/LogoPeQ.png';

function Header() {

    // menuburger version mobile
    const [menuHidden, setMenuHidden] = useState(false);
    const toggleMenu = () => setMenuHidden(!menuHidden);

    const { pathname } = useLocation(); // sert à changer la classname du header en fonction de l'url (page d'accueil ou reste du site)

    const [users, setUsers] = useState(null);
    const myuserid = getItemWithExpiration("myuserid"); // récupère le pseudo de l'usager stocké lors du signin

    useEffect(() => {
        async function getUserHeader() {
            try {
                let id = "";
                if (!myuserid) {
                    return
                } else {
                    id = myuserid;
                }

                const TOKEN = getItemWithExpiration('auth');
                const users = await fetch(FETCH_URL + "users/" + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN}`
                    }
                });

                if (users.status === 200) {
                    const json = await users.json();
                    setUsers(json);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getUserHeader();
    }, []);

    const { cartInfo } = useSelector((state) => state.cart); // reducer du panier

    function computeCart() {
        {/* Affiche le nombre de produit dans le panier  au niveau du pictogramme*/ }
        let sum = 0;
        if (!cartInfo) { // sert à réinitialiser l'affichage du panier vide lors du localStorage.removeItem("cart")
            return sum = 0;
        } else {
            for (const item of cartInfo.product) {
                sum += item.quantity;
            }
            return sum;
        }
    }


    return (
        <>
            <header className={pathname === "/" ? "home_header" : "navigation_header"}>

                <div className="header_width">
                    <Link to="/">
                        <div className="divlogo">
                            <img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" />
                            <h1>OZES STORE</h1>
                        </div>
                    </Link>

                    <FontAwesomeIcon icon={faBars} size="xl" className={menuHidden ? "faBars fontawesomeYellow burger_hidden mediaQ_hidden" : "faBars fontawesomeYellow mediaQ_hidden"} onClick={toggleMenu} />
                    <FontAwesomeIcon icon={faXmark} size="xl" className={menuHidden ? "faXmark fontawesomeYellow mediaQ_hidden" : "faXmark fontawesomeYellow burger_hidden mediaQ_hidden"} onClick={toggleMenu} />

                    <div className={menuHidden ? "mediaQ_show ctn_nav" : "burger_hidden mediaQ_show ctn_nav"}>
                        <nav>
                            <NavLink to="/le_store">Le store</NavLink>
                            <NavLink to="/la_marque">La marque</NavLink>
                        </nav>
                        <div className="ctn_pictoheader">
                            {!myuserid ? ( // dynamise correctement l'affichage des icones de connexion - deconnexion. Avec uniquement la ternaire users qui suit, à la déconnexion les picto user_in et user_logout sont toujours présents tant qu'on ne refresh pas la page
                                <Link to="/utilisateurs/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                            ) : (
                                <>
                                    {!users ? ( // récupère les infos en fonction de l'usager qui est connecté
                                        <Link to="/utilisateurs/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                    ) : (
                                        <>
                                            <Link to={`/utilisateurs/${users[0].id}`} title="Accédez à votre compte"><img className="picto_header" src={user_in} alt="pictogramme de tête" /></Link>
                                            <Link to={"/utilisateurs/deconnexion"} title="Se déconnecter"><img className="picto_header" src={user_logout} alt="pictogramme de tête" /></Link>
                                        </>
                                    )
                                    }

                                </>
                            )}

                            <Link to="/panier" className="picto_cart">
                                <p className="cart_content">{cartInfo.product.length ? computeCart() : ""}</p> {/* Affiche le nombre de produit dans le panier */}
                                <img className="picto_header" src={cart_empty} alt="pictogramme de chariot" />
                            </Link>
                        </div>
                    </div>

                </div>

                <p className="french_label"><span className="blue">Desig</span><span className="white">n Fra</span><span className="red">nçais</span></p>
            </header>
        </>
    );
}

export default Header;