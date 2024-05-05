import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from "../Components/PreviousPage";

function InfoConnexion() {

  const [user, setUser] = useState(null);
  const TOKEN = getItemWithExpiration('auth');
  const myuserid = getItemWithExpiration("myuserid");

  useEffect(() => {
    async function getUserInfos() {
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
            'Authentication': `Bearer ${TOKEN}`,
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
    getUserInfos();
  }, []);

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <>

          <PreviousPage user={user[0]} />

          <section className="form_section">

            <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title read">Vos informations de connexion</h3>
            <form>

              <input
                placeholder="Mot de passe"
                type="password"
                name="password"
                value={user[0].password}
                disabled="disabled"
              />
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={user[0].email}
                disabled="disabled"
              />

              <p className='input_link_btn'><Link to={`/utilisateurs/infos-connexion-update/${user[0].id}`}>Modifier</Link></p>

            </form>

            <p className="delete_profil"><Link to={`/utilisateurs/supprimer-compte/${user[0].id}`}>Supprimer mon compte</Link></p>

          </section>
        </>
      )}

    </>
  )
}

export default InfoConnexion;