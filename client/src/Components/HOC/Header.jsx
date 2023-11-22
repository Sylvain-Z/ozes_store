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

    // const { info } = useSelector((state) => state.user);
    
    const [ menuHidden, setMenuHidden ] = useState(false);
    const toggleMenu = () => setMenuHidden(!menuHidden);

    const { pathname } = useLocation();

    const [ users, setUsers ] = useState(null);
    const myuserid = localStorage.getItem("myuserid");

    useEffect(() => {
      async function getData() {
          try {
              let id="Invite"; 
  
              if(!myuserid){ 
                  id="Invite"; 
              }else{ 
              id=myuserid; 
              } 
  
              const users = await fetch("/api/v1/users/"+ id);
          
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


        const { cartInfo } = useSelector((state) => state.cart);

        function computeCart(){
            let sum = 0;
            for (const item of cartInfo.product) {
                sum += item.quantity * item.priceEach;
            }
            return sum.toFixed(2);
        }
    
    
    return (
        <>
                <header className={pathname === "/" ? "home_header" : "navigation_header"}>
                    
                    <div className="header_width">
                        <div className="divlogo">
                            <Link to="/la_marque"><img className="logo_PeQ" src={LogoPeQ} alt="Logo PeQ" /></Link>
                            <Link to="/"><h1>OZES STORE</h1></Link>
                        </div>

                        <FontAwesomeIcon icon={faBars} size="xl" className={menuHidden ? "faBars fontawesomeYellow burger_hidden mediaQ_hidden" : "faBars fontawesomeYellow mediaQ_hidden"} onClick={toggleMenu}/>
                        <FontAwesomeIcon icon={faXmark} size="xl" className={menuHidden ? "faXmark fontawesomeYellow mediaQ_hidden" : "faXmark fontawesomeYellow burger_hidden mediaQ_hidden"} onClick={toggleMenu}/>
                        
                        <div className={menuHidden ? "mediaQ_show ctn_nav" : "burger_hidden mediaQ_show ctn_nav"}>
                            <nav>
                                <NavLink to="/le_store">Le store</NavLink>
                                <NavLink to="/la_marque">La marque</NavLink>
                            </nav>
                            <div className="ctn_pictoheader">
                            {!localStorage.getItem("myuserid") ? (
                                <Link to="/utilisateurs/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                ) : ( 
                                    <>
                                    {!users ? (
                                        <Link to="/utilisateurs/connexion"><img className="picto_header" src={user_out} alt="pictogramme de tête" /></Link>
                                        ) : ( users.map ( user => 
                                            <>
                                                <Link to={`/utilisateurs/${user.id}`} title="Accédez à votre compte"><img className="picto_header" src={user_in} alt="pictogramme de tête" /></Link>
                                                <Link to={"/utilisateurs/deconnexion"} title="Se déconnecter"><img className="picto_header" src={user_logout} alt="pictogramme de tête" /></Link>
                                            </>
                                        ))
                                    }
                                        
                                    </>
                                )}                

                                <Link to="/panier" className="cart">
                                    <p className="cart_content">{cartInfo.product.length ? computeCart() + "€" : ""}</p>
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