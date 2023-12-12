import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from "../Components/PreviousPage";

function InfoConnexion() {

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

                    <p className='input_link_btn'><Link to={`/utilisateurs/infos-connexion-update/${user.id}`}>Modifier mes informations</Link></p>

                  </form>
                  
                  <p className="delete_profil"><Link to={`/utilisateurs/supprimer-compte/${user.id}`}>Supprimer mon compte</Link></p>

                  </section>
                </>
              ))}
      
    </>
  )
}

export default InfoConnexion;