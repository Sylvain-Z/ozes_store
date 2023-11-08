import React from 'react'
// import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { Link , /* useNavigate */ } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

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

                      <h2>Bienvenue sur votre compte {user.pseudo}</h2>

                        <div className="dashboard_nav">
                          <FontAwesomeIcon icon={faTruckFast} size="lg"/> 
                          <Link to={`/utilisateurs/infos-livraison/${user.id}`}>
                            <p className="dashboard_titles dt1">Infos de livraison </p>
                          </Link>

                          <FontAwesomeIcon icon={faBoxOpen} /> 
                          <Link to={`/utilisateurs/vos-commandes/${user.id}`}>
                            <p className="dashboard_titles dt2">Mes commandes</p>
                          </Link>

                          <FontAwesomeIcon icon={faIdBadge} />
                          <Link to={`/utilisateurs/infos-connexion/${user.id}`}>
                            <p className="dashboard_titles dt3">Infos de connexion</p>
                          </Link>

                          <div className='contact_button'>
                            <FontAwesomeIcon icon={faMessage} />
                            <p>Vous souhaitez nous contacter ? Appelez ou écrivez-nous</p>
                            <button onClick={() => window.location = 'tel:+0000000000'} >0799154295</button>
                            <button onClick={() => window.location = 'mailto:ozes.store@gmail.com'}>ozes.store@gmail.com</button>
                          </div>
                        </div>
                    </>
                    ))}

      
    
    </>
  )
};

export default Dashboard;