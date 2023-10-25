import { useNavigate, Link , /*useParams ,  useLocation*/ } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";
import PreviousPage from "./Components/previousPage";


function Delivery() {
  
  const { info } = useSelector((state) => state.user);

  const [ users, setUsers ] = useState(null);
  // const params   = useParams();

  const navigate = useNavigate();
    
  useEffect(() => {
          async function getData() {
              try {
                const users = await fetch("/api/v1/users/"+ info.id);
                if (users.status === 404) {
                  navigate("users/not-found");
                }
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

  console.log("PAGE INFORMATION Fetch 222222222222222222 --->", users);

  return (
    <>
        {!users ? (
                    <Loading/>
                ) : ( users.map( user =>

                  <>
                  <Link to={`/utilisateurs/${user.id}`}><p className="previous_page">Votre compte</p></Link>

                  <section className="form_section">

                    <FontAwesomeIcon icon={faTruckFast} size="lg" style={{color: "rgb(255, 196, 50)"}}/>
                    <h3 className="form_title read">Vos informations de livraison</h3>
                  
                     <form>
                     <input
                            placeholder="Numéro de la rue"
                            type="text"
                            name="number"
                            value={user.number}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Nom de la rue"
                            type="text"
                            name="street"
                            value={user.street}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Complément d'adresse"
                            type="text"
                            name="complement"
                            value={user.complement}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Code postale"
                            type="text"
                            name="postalcode"
                            value={user.postal_code}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Ville"
                            type="text"
                            name="city"
                            value={user.city}
                            disabled="disabled"
                      />

                      <Link to={`/utilisateurs/infos-livraison-update/${user.id}`}><button type="button">Modifier mes informations</button></Link>

                      {/* <button type="button" onClick={() => window.location.href =`/utilisateurs/infos-livraison-update/${user.user_id}`}>Modifier mes informations</button> */} {/* Cette version du boutton ne fonctionne pas à cause de la non persistance de la connexion */}
                    </form>
                    
                    </section>
                  </>
                ))}
    </>
  )
}

export default Delivery;