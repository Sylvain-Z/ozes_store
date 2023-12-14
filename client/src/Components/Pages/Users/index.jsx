import { useState, useEffect } from 'react';
import React from 'react';

import { FETCH_URL } from '../../../assets/const';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faTruckFast, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading/Index";
import BackToStore from '../Containers/BackToStore/Index';

function Dashboard() {

  const [users, setUsers] = useState(null);
  const myuserid = localStorage.getItem("myuserid");

  useEffect(() => {
    async function getData() {
      try {
        let id = "";
        if (!myuserid) {
          return
        } else {
          id = myuserid;
        }
        const users = await fetch(FETCH_URL + "users/" + id);

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
        <Loading />
      ) : (users.map(user =>

        <React.Fragment key={user.id}>

          <h2 className='dashboard_title'>Bienvenue sur votre compte {user.pseudo}</h2>

          <nav className="dashboard_nav">
            <FontAwesomeIcon icon={faBoxOpen} />
            <p className="dashboard_tabs"><Link to={`/utilisateurs/vos-commandes/${user.id}`}>Mes commandes</Link></p>

            <FontAwesomeIcon icon={faMessage} />
            <p className="dashboard_tabs"><Link to={`/utilisateurs/messages/${user.id}`}>Messages</Link></p>

            <FontAwesomeIcon icon={faTruckFast} size="lg" />
            <p className="dashboard_tabs"><Link to={`/utilisateurs/infos-livraison/${user.id}`}>Infos de livraison</Link></p>

            <FontAwesomeIcon icon={faIdBadge} />
            <p className="dashboard_tabs"><Link to={`/utilisateurs/infos-connexion/${user.id}`}>Infos de connexion </Link></p>

          </nav>

          <BackToStore />

        </React.Fragment>
      ))}

    </>
  )
};

export default Dashboard;