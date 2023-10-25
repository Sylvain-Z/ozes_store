import { useNavigate, Link , /*useParams ,  useLocation*/ } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";
import PreviousPage from "./Components/previousPage";


function InfoUser() {
  
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

  console.log("PAGE PERSO Fetch 222222222222222222 --->", users);

  return (
    <>
        {!users ? (
                    <Loading/>
                ) : ( users.map( user =>

                  <>
                  <Link to={`/utilisateurs/${user.id}`}><p className="previous_page">Votre compte</p></Link>

                  <section className="form_section">

                    <FontAwesomeIcon icon={faIdBadge} size="lg" style={{color: "rgb(255, 196, 50)"}}/>
                    <h3 className="form_title read">Vos informations de livraison</h3>
                     <form>
                      <input
                            placeholder="Prénom"
                            type="text"
                            name="firstname"
                            value={user.firstname}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Nom"
                            type="text"
                            name="lastname"
                            value={user.lastname}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={user.email}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Date d'anniversaire"
                            type="date"
                            name="birthdate"
                            value={user.birthdate}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Mot de passe"
                            type="password"
                            name="password"
                            value={user.password}
                            disabled="disabled"
                      />
                      
                      <Link to={`/utilisateurs/infos-perso-update/${user.id}`}><button type="button">Modifier mes informations</button></Link>

                      {/* <button type="button" onClick={() => window.location.href =`/utilisateurs/infos-perso-update/${user.user_id}`}>Modifier mes informations</button> */} {/* Cette version du boutton ne fonctionne pas à cause de la non persistance de la connexion */}

                    </form>
                    </section>
                  </>
                ))}
      
    </>
  )
}

export default InfoUser;