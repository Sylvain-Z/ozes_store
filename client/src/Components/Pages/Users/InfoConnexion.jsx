import { Link , /*useNavigate, useParams ,  useLocation*/ } from 'react-router-dom';
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";
import PreviousPage from "./Components/previousPage";

function InfoConnexion() {
  
  // const { info } = useSelector((state) => state.user);

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

  console.log("PAGE INFOSPERSOUSER Fetch --->", users);

  return (
    <>
        {!users ? (
                    <Loading/>
                ) : ( users.map( user =>

                  <>
                  
                  <PreviousPage user={user}/>

                  <section className="form_section">

                    <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
                    <h3 className="form_title read">Vos informations de connexion</h3>
                     <form>
                      
                      <input
                            placeholder="Mot de passe"
                            type="password"
                            name="password"
                            value={user.password}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={user.email}
                            disabled="disabled"
                      />

                      <button type="button" onClick={() => window.location.href =`/utilisateurs/infos-connexion-update/${user.id}`}>Modifier mes informations</button>

                    </form>
                    </section>
                  </>
                ))}
      
    </>
  )
}

export default InfoConnexion;