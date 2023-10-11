import { useLocation , Link , NavLink } from "react-router-dom";
import cart_empty from './assets/img/cart_empty.png'
import user_out from './assets/img/user_out.png'
import LogoPeQ from './assets/img/LogoPeQ.png';
import picto_insta from './assets/img/picto_insta.png';
import picto_fb from './assets/img/picto_fb.png';

function HOC({ child }) {
    const { pathname } = useLocation();
    const Child = child;  // on transforme la props en nom de components (PascalCase)
    
    return (
        <>
            <div id={pathname === "/" ? "home_body" : ""}>

                <header className={pathname === "/" ? "home_header" : "navigation_header"}>
                    
                    <div className="header_width">
                        <div>
                            <NavLink to="/la_marque"><img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" /></NavLink>
                            <Link to="/"><h1>OZES STORE</h1></Link>
                        </div>
                         <nav className="onglets">
                            <NavLink to="/le_store" className="onglet_store">Le store</NavLink>
                            <NavLink to="/la_marque" className="onglet_marque">La marque</NavLink>
                        </nav>
                        
                        <Link to="/connexion"><img className="picto_header" src={user_out} alt="pictogramme de chariot" /></Link>
                        <Link to="/panier" ><img className="picto_header" src={cart_empty} alt="pictogramme de chariot" /></Link>
                        
                    </div>

                    <p className="french_label"><span className="blue">Desig</span><span className="white">n Fra</span><span className="red">nçais</span></p>
                </header>

                
                <Child />

                <footer className={pathname === "/" ? "home_footer" : "navigation_footer"}>
		
                    <div className="other_pages" >
                        <Link to="/la_marque">LA MARQUE/CONTACT</Link>
                        <Link to="/guide_des_tailles">GUIDE DES TAILLES</Link>
                        <Link to="/cgu_cgv">CONDITIONS GENERALES D'UTILISATION</Link>
                    </div>

                    <aside className="sociallinks" >
                        <Link to="https://www.facebook.com/ozes.store" target="_blank"> <img src={picto_fb} alt="pictoinsta"/></Link>
                        <Link to="https://www.instagram.com/ozes.store/" target="_blank"> <img src={picto_insta} alt="pictoface"/></Link>
                    </aside>
                    <p className="copyright">@2023, OZES STORE</p>
                </footer>


            </div>

        </>
    );
}

export default HOC;