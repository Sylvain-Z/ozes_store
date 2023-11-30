import { useLocation , Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook , faInstagram} from '@fortawesome/free-brands-svg-icons';

function Footer() {

    const { pathname } = useLocation();
    
    return (
        <>
            <footer className={pathname === "/" ? "home_footer" : "navigation_footer"}>
    
                <div className="other_pages" >
                    <Link to="/la_marque">LA MARQUE/CONTACT</Link>
                    <Link to="/guide_des_tailles">GUIDE DES TAILLES</Link>
                    <Link to="/cgu_cgv">CONDITIONS GENERALES D'UTILISATION</Link>
                </div>

                <aside className="sociallinks" >
                    <Link to="https://www.facebook.com/ozes.store" target="_blank"><FontAwesomeIcon icon={faSquareFacebook} size="xl" className="fontawesomeYellows"/></Link>
                    <Link to="https://www.instagram.com/ozes.store/" target="_blank"><FontAwesomeIcon icon={faInstagram} size="xl" className="fontawesomeYellows"/></Link>
                </aside>
                <p className="copyright">@2023, OZES STORE</p>
            </footer>

        </>
    );
}

export default Footer;