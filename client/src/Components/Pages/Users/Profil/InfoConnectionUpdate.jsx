import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function InfoConnexionUpdate() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [password, setPassword] = useState(""); // ne pas remplir le formulaire avec le password car le password hashé ne convient pas à la vérification fait par la regex côté server
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState(""); // le champ du formulaire n'est pas nécessaire, cependant la state pour le "body: JSON.stringify({ password, email , pseudo })"" est obligatoire
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [msg2, setMsg2] = useState("");

  const TOKEN = getItemWithExpiration('auth');
  const myuserid = getItemWithExpiration("myuserid");

  useEffect(() => {
    async function getUserInfosUpdate() {
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
          },
        });

        if (user.status === 200) {
          const json = await user.json();

          setUser(json);
          setEmail(json[0].email);
          setPseudo(json[0].pseudo);
          setId(json[0].id);

        }
      } catch (error) {
        throw Error(error);
      }
    }
    getUserInfosUpdate();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(FETCH_URL + "users/infos-connexion-update/" + myuserid, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ password, email, pseudo }),
    });
    const json = await res.json();
    setMsg(json.msg);
    setMsg2(json.msg2);

    if (res.status === 201) {
      navigate(`/utilisateurs/infos-connexion/${id}`);
    }
  }

  return (
    <>
      {!user ? (
        <Loading />
      ) : (

        <>
          <p className="previous_page"><Link to={`/utilisateurs/infos-connexion/${user[0].id}`}>Retour</Link></p>

          <section className="form_section">

            <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title update">Modification de vos informations de connexion</h3>

            {msg && <p className="msg_red">{msg}</p>}
            {msg2 && <p className="msg_green">{msg2}</p>}

            <form onSubmit={handleSubmit}>

              <label htmlFor="password">Mot de passe</label>
              <input
                placeholder="Tapez un nouveau mot de passe pour le changer"
                type="password"
                name="password"
                value={password} // ne pas remplir le formulaire avec le password car le password hashé ne convient pas à la vérification fait par la regex côté server
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="complement">Votre adresse mail</label>
              <input
                placeholder="Votre adresse email"
                type="text" // vérification du format de l'entrée de l'utilisateur côté server
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className="form_advise">
                <em>Votre pseudo est unique et n'est pas modifiable</em></p>

              <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
              <p className="button_retour_rouge"><Link to={`/utilisateurs/infos-connexion/${user[0].id}`} ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></Link></p>

            </form>

            <p></p>
          </section>
        </>
      )}
    </>
  )
}

export default InfoConnexionUpdate;