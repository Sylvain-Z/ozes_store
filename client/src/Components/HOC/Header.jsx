import { useSelector } from "react-redux";
import { useLocation , Link , NavLink } from "react-router-dom";

import cart_empty from '../../assets/img/cart_empty.png'
import user_out from '../../assets/img/user_out.png'
import user_in from '../../assets/img/user_in.png'
import LogoPeQ from '../../assets/img/LogoPeQ.png';

function Header() {

    const { info } = useSelector((state) => state.user);
    const { pathname } = useLocation();
    
    return (
        <>
                <header className={pathname === "/" ? "home_header" : "navigation_header"}>
                    
                    <div className="header_width">
                        <div>
                            <Link to="/la_marque"><img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" /></Link>
                            <Link to="/"><h1>OZES STORE</h1></Link>
                        </div>
                         <nav className="onglets">
                            <NavLink to="/le_store" className="onglet_store">Le store</NavLink>
                            <NavLink to="/la_marque" className="onglet_marque">La marque</NavLink>
                        </nav>

                        {!info.isLogged ? (
                            <Link to="/utilisateurs/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                        ) : (
                            <>
                                <Link to={"utilisateur/votre-compte"}><img className="picto_header" src={user_in} alt="pictogramme de tête" /></Link>
                                <Link title="Se déconnecter">SE DECONNECTER</Link>
                            </>
                        )}

                        <Link to="/panier" ><img className="picto_header" src={cart_empty} alt="pictogramme de chariot" /></Link>
                        
                    </div>

                    <p className="french_label"><span className="blue">Desig</span><span className="white">n Fra</span><span className="red">nçais</span></p>
                </header>


        </>
    );
}

export default Header;