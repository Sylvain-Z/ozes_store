// import { useSelector } from "react-redux";
import { useLocation , Link } from "react-router-dom";
import { useState , useEffect } from 'react';

import user_out from '../../assets/img/user_out.png';
import user_in from '../../assets/img/user_in.png';
import user_logout from '../../assets/img/user_logout.png';
import LogoPeQ from '../../assets/img/LogoPeQ.png';

function Header() {

    // const { info } = useSelector((state) => state.user);
    const { pathname } = useLocation();
    
    const [ employees, setEmployees ] = useState(null);
    const myemployeeid = localStorage.getItem("myemployeeid");
    

    useEffect(() => {
        async function getData() {
            try {
                let id; 
             
                if(!myemployeeid){ 
                    id="Invite"; 
                }else{ 
                   id=myemployeeid;
                } 

                const employees = await fetch("/api/v1/employees/"+ id);
              
                if (employees.status === 200) {
                    const json = await employees.json();
                    setEmployees(json);
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
                            <img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" />
                            <h1>OZES STORE SAS</h1>
                        </div>

                        {!localStorage.getItem("myemployeeid") ? (
                                <Link to="/employes/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                ) : ( 
                                    <>
                                    {!employees ? (
                                        <Link to="/employes/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                        ) : ( 
                                            <>
                                                <Link to={`/employes`} title="Accédez à votre compte"><img className="picto_header" src={user_in} alt="pictogramme de tête" /></Link>
                                                <Link to={"/employes/deconnexion"} title="Se déconnecter"><img className="picto_header" src={user_logout} alt="pictogramme de tête" /></Link>
                                            </>
                                        )
                                    }
                                        
                                    </>
                                )}

                    </div>

                    <p className="french_label"><span className="blue">Desig</span><span className="white">n Fra</span><span className="red">nçais</span></p>
                </header>


        </>
    );
}

export default Header;