// import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { Link , /* useNavigate */ } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faTruckFast , faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";

function Dashboard() {

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

  return (
    <>
      {!users ? (
                    <Loading/>
                ) : ( users.map( user =>
                    <>

                      <h2 className='dashboard_title'>Bienvenue sur votre compte {user.pseudo}</h2>

                        <nav className="dashboard_nav">
                          <FontAwesomeIcon icon={faBoxOpen} /> 
                          <Link to={`/utilisateurs/vos-commandes/${user.id}`}>
                            <p className="dashboard_tabs dt1">Mes commandes</p>
                          </Link>

                          <FontAwesomeIcon icon={faTruckFast} size="lg"/> 
                          <Link to={`/utilisateurs/infos-livraison/${user.id}`}>
                            <p className="dashboard_tabs dt2">Infos de livraison </p>
                          </Link>

                          <FontAwesomeIcon icon={faIdBadge} />
                          <Link to={`/utilisateurs/infos-connexion/${user.id}`}>
                            <p className="dashboard_tabs dt3">Infos de connexion</p>
                          </Link>

                          <FontAwesomeIcon icon={faMessage} />
                          <Link to={`/utilisateurs/messages/${user.id}`}>
                            <p className="dashboard_tabs dt4">Messages</p>
                          </Link>
                        </nav>

                    </>
                    ))}
    
    </>
  )
};

export default Dashboard;