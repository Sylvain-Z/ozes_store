import { useSelector } from "react-redux";
import { Link , NavLink , useLocation } from "react-router-dom";
import { useState , useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import cart_empty from '../../assets/img/cart_empty.png';
import user_out from '../../assets/img/user_out.png';
import user_in from '../../assets/img/user_in.png';
import user_logout from '../../assets/img/user_logout.png';
import LogoPeQ from '../../assets/img/LogoPeQ.png';

function Header() {

    const { info } = useSelector((state) => state.user);

    const [ menuHidden, setMenuHidden ] = useState(false);
    const toggleMenu = () => setMenuHidden(!menuHidden);

    const { pathname } = useLocation();

    const [ users, setUsers ] = useState(null);
    

    useEffect(() => {
        async function getData() {
            try {
              const users = await fetch("/api/v1/users/"+ info.id);
              if (users.status === 200) {
                const json = await users.json();
                setUsers(json);
              }
            } catch (error) {
            throw Error(error);
        }
    }
    getData();
    }, []);
    
    
    return (
        <>
                <header className={pathname === "/" ? "home_header" : "navigation_header"}>
                    
                    <div className="header_width">
                        <div>
                            <Link to="/la_marque"><img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" /></Link>
                            <Link to="/"><h1>OZES STORE</h1></Link>
                        </div>

                        <FontAwesomeIcon icon={faBars} style={{color: "rgb(255, 196, 50)",}} size="2xl" className={menuHidden ? "faBars burger_hidden" : "faBars"} onClick={toggleMenu}/>
                        <FontAwesomeIcon icon={faXmark} style={{color: "rgb(255, 196, 50)",}} size="2xl" className={menuHidden ? "faXmark" : "faXmark burger_hidden"} onClick={toggleMenu}/>
                        
                        <div className={menuHidden ? "" : "burger_hidden"}>
                            <nav>
                                <NavLink to="/le_store">Le store</NavLink>
                                <NavLink to="/la_marque">La marque</NavLink>
                            </nav>

                            {!info.isLogged ? (
                                <Link to="/utilisateurs/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                ) : ( 
                                    <>
                                    {!users ? (
                                        <Link to="/utilisateurs/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                        ) : ( users.map ( user => 
                                            <>
                                                <Link to={`/utilisateurs/${user.user_id}`} title="Accédez à votre compte"><img className="picto_header" src={user_in} alt="pictogramme de tête" /></Link>
                                                <Link to={"/utilisateurs/deconnexion"} title="Se déconnecter"><img className="picto_header" src={user_logout} alt="pictogramme de tête" /></Link>
                                            </>
                                        ))
                                    };
                                        
                                    </>
                                )}                

                            <Link to="/panier" ><img className="picto_header" src={cart_empty} alt="pictogramme de chariot" /></Link>
                        </div>
                        
                    </div>

                    <p className="french_label"><span className="blue">Desig</span><span className="white">n Fra</span><span className="red">nçais</span></p>
                </header>
        </>
    );
}

export default Header;