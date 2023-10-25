import { useLocation , Link } from "react-router-dom";


function Footer() {

    const { pathname } = useLocation();
    
    return (
        <>
            <footer className={pathname === "/" ? "home_footer" : "navigation_footer"}>
            <Link to={"/employes/deconnexion"} title="Se déconnecter">SE DECONNECTER</Link>
            </footer>

        </>
    );
}

export default Footer;