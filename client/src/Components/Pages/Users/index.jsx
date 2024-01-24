import { useState, useEffect } from 'react';
import React from 'react';

import { FETCH_URL } from '../../../assets/const';
import { getItemWithExpiration } from '../../../assets/functions';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faTruckFast, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading/Index";
import BackToStore from '../Containers/BackToStore/Index';

function Dashboard() {

  const [users, setUsers] = useState(null);
  const TOKEN = getItemWithExpiration('auth');
  const myuserid = getItemWithExpiration("myuserid");

  useEffect(() => {
    async function getData() {
      try {
        let id = "";
        if (!myuserid) {
          return
        } else {
          id = myuserid;
        }
        const users = await fetch(FETCH_URL + "users/" + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${TOKEN}`
          }
        });

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
            <Link to={`/utilisateurs/vos-commandes/${user.id}`}>
              <p className="dashboard_tabs">Mes commandes</p>
            </Link>

            <FontAwesomeIcon icon={faMessage} />
            <Link to={`/utilisateurs/messages/${user.id}`}>
              <p className="dashboard_tabs">Messages</p>
            </Link>

            <FontAwesomeIcon icon={faTruckFast} size="lg" />
            <Link to={`/utilisateurs/infos-livraison/${user.id}`}>
              <p className="dashboard_tabs">Infos de livraison</p>
            </Link>

            <FontAwesomeIcon icon={faIdBadge} />
            <Link to={`/utilisateurs/infos-connexion/${user.id}`}>
              <p className="dashboard_tabs">Infos de connexion</p>
            </Link>
          </nav>

          <BackToStore />

        </React.Fragment>
      ))}

    </>
  )
};

export default Dashboard;