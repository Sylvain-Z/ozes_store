import { useLocation, Link, NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

import { FETCH_URL } from '../../assets/const';
import { getItemWithExpiration } from '../../assets/functions';

import user_out from '../../assets/img/user_out.png';
import user_in from '../../assets/img/user_in.png';
import user_logout from '../../assets/img/user_logout.png';
import LogoPeQ from '../../assets/img/LogoPeQ.png';

function Header() {

    const { pathname } = useLocation();

    const [employees, setEmployees] = useState(null);
    const TOKEN_EMPL = getItemWithExpiration('authe');
    const myemployeeid = getItemWithExpiration("myemployeeid");  // récupère l'email de l'usager stocké lors du signin

    useEffect(() => {
        async function getEmplHeader() {
            try {
                let id = "";
                if (!myemployeeid) {
                    return
                } else {
                    id = myemployeeid;
                }
                const employees = await fetch(FETCH_URL + "employees/" + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`
                    }
                });

                if (employees.status === 200) {
                    const json = await employees.json();
                    setEmployees(json);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getEmplHeader();
    }, []);

    return (
        <>
            <header className={pathname === "/" ? "home_header" : "navigation_header"}>

                <div className="header_width">
                    <div className="divlogo">
                        <img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" />
                        <h1>OZES STORE</h1>
                    </div>
                    <div className="ctn_pictoheader ctn_empl_laptop">
                        {!myemployeeid ? ( // dynamise correctement l'affichage des icones de connexion - deconnexion. Avec uniquement la ternaire users qui suit, à la déconnexion les picto user_in et user_logout sont toujours présents tant qu'on ne refresh pas la page
                            <Link to="/employes/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                        ) : (
                            <>
                                {!employees ? ( // récupère les infos en fonction de l'usager qui est connecté
                                    <Link to="/employes/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                ) : (
                                    <>
                                        <img className="picto_header" src={user_in} alt="pictogramme de tête" />
                                        <NavLink to="/employes" className="navlink_employees">Tableau de bord</NavLink>
                                        <Link to="/employes/deconnexion" title="Se déconnecter"><img className="picto_header" src={user_logout} alt="pictogramme de tête" /></Link>
                                    </>
                                )
                                }
                            </>
                        )}
                    </div>
                </div>

                <p className="french_label"><span className="blue">Desig</span><span className="white">n Fra</span><span className="red">nçais</span></p>
            </header>


        </>
    );
}

export default Header;