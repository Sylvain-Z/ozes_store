import { useState, useEffect , React } from "react";
import { Link } from "react-router-dom";

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from "../Components/PreviousPage";

function InfoConnexion() {

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

          <PreviousPage user={user} />

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
        </React.Fragment>
      ))}

    </>
  )
}

export default InfoConnexion;