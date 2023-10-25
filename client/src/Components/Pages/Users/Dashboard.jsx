import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { Link , useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";

function Dashboard() {

  const { info } = useSelector((state) => state.user);
  const [ users, setUsers ] = useState(null);
  const [ session, setSession ] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
        try {
          const users = await fetch("/api/v1/users/" + info.id);
          if (users.status === 404) {
            navigate("utilisateurs/not-found");
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

  useEffect(() => {
    async function getSession() {
      try {
        const TOKEN = localStorage.getItem('auth');
        const res = await fetch("api/v1/users/session/${info.id}", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication' : `Bearer ${TOKEN}`
          }
        });
        const json = await res.json();
        setSession(json);

      } catch (error) {
        throw Error(error);
      }
    }
    getSession();
  },[]);
  console.log("SESSION DASHBOARD ->", session)
    
  

  

  return (
    <>

      <h2>Bienvenue sur votre compte</h2>

      <div className="dashboard_nav">

      {!users ? (
                    <Loading/>
                ) : ( users.map( user =>
                    <>
                      <FontAwesomeIcon icon={faTruckFast} size="lg"/> 
                      <Link to={`/utilisateurs/infos-livraison/${user.id}`}>
                        <p className="dashboard_titles dt1">Infos de livraison </p>
                      </Link>

                      <FontAwesomeIcon icon={faBoxOpen} /> 
                      <Link to={`/utilisateurs/vos-commandes/${user.id}`}>
                        <p className="dashboard_titles dt2">Mes commandes</p>
                      </Link>

                      <FontAwesomeIcon icon={faMessage} />
                      <Link to={`/utilisateurs/sav-message/${user.id}`}>
                        <p className="dashboard_titles dt3">Service Client</p>
                      </Link>

                      <FontAwesomeIcon icon={faIdBadge} />
                      <Link to={`/utilisateurs/infos-perso/${user.id}`}>
                        <p className="dashboard_titles dt3">Infos Personelles</p>
                      </Link>
                    </>
                    ))}

      </div>
    
    </>
  )
};

export default Dashboard;