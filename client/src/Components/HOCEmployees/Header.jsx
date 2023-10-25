import { useSelector } from "react-redux";
import { useLocation , Link } from "react-router-dom";

import LogoPeQ from '../../assets/img/LogoPeQ.png';

function Header() {

    const { info } = useSelector((state) => state.user);
    const { pathname } = useLocation();
    console.log(info);
    
    return (
        <>
                <header className={pathname === "/" ? "home_header" : "navigation_header"}>
                    
                    <div className="header_width">
                        <div>
                            <Link to="/la_marque"><img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" /></Link>
                            <Link to="/"><h1>OZES STORE</h1></Link>
                        </div>

                        {!info.isLogged ? (
                            <></>
                        ) : (
                            <>
                                <h3>Bienvenue nom d'employé</h3>
                            </>
                        )}

                    </div>

                    <p className="french_label"><span className="blue">Desig</span><span className="white">n Fra</span><span className="red">nçais</span></p>
                </header>


        </>
    );
}

export default Header;