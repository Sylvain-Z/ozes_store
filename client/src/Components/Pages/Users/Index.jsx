import { useState, useEffect } from 'react';
import React from 'react';

import { FETCH_URL } from '../../../assets/const';
import { getItemWithExpiration } from '../../../assets/functions';

import { Link } from 'react-router-dom';

import Loading from "../Containers/Loading/Index";
import BackToStore from '../Containers/BackToStore/Index';

function Dashboard() {

  const [user, setUser] = useState(null);
  const TOKEN = getItemWithExpiration('auth');
  const myuserid = getItemWithExpiration("myuserid");

  useEffect(() => {
    async function getUserDashboard() {
      try {
        let id = "";
        if (!myuserid) {
          return
        } else {
          id = myuserid;
        }
        const user = await fetch(FETCH_URL + "users/" + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${TOKEN}`
          }
        });

        if (user.status === 200) {
          const json = await user.json();
          setUser(json);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getUserDashboard();
  }, []);

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <>
          <h2 className='dashboard_title'>Bienvenue sur votre compte {user[0].pseudo}</h2>

          <nav className="dashboard_nav">

            <Link to={`/utilisateurs/vos-commandes/${user[0].id}`}>
              <div className="dashboard_div orders-div">
              <p className="dashboard_tabs orders-tabs">Mes Commandes</p>
              </div>
            </Link>

            <Link to={`/utilisateurs/messages/${user[0].id}`}>
              <div className="dashboard_div messages-div">
              <p className="dashboard_tabs messages-tabs">Messages</p>
              </div>
            </Link>

            <Link to={`/utilisateurs/infos-livraison/${user[0].id}`}>
              <div className="dashboard_div infos-div">
              <p className="dashboard_tabs infos-tabs">Infos de livraison</p>
              </div>
            </Link>

            <Link to={`/utilisateurs/infos-connexion/${user[0].id}`}>
              <div className="dashboard_div connexion-div">
              <p className="dashboard_tabs connexion-tabs">Infos de connexion</p>
              </div>
            </Link>
          </nav>

          <BackToStore />

        </>
      )}
    </>
  )
};

export default Dashboard;