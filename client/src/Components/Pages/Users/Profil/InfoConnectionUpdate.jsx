import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, React } from "react";

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function InfoConnexionUpdate() {

  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState(""); // le champ du formulaire n'est pas nécessaire, cependant la state pour le "body: JSON.stringify({ password, email , pseudo })"" est obligatoire
  const [id, setId] = useState("");
  const [msg, setMsg] = useState(null);

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

          setPassword(json[0].password);
          setEmail(json[0].email);
          setPseudo(json[0].pseudo);
          setId(json[0].id);

        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(FETCH_URL + "users/infos-connexion-update/" + myuserid, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email, pseudo }),
    });
    const json = await res.json();
    setMsg(json.msg);

    if (res.status === 201) {
      navigate(`/utilisateurs/infos-connexion/${id}`);
    }
  }

  return (
    <>
      {!users ? (
        <Loading />
      ) : (users.map(user =>

        <React.Fragment key={user.id}>
          <p className="previous_page"><Link to={`/utilisateurs/infos-connexion/${user.id}`}>Retour</Link></p>

          <section className="form_section">

            <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title update">Modification de vos informations de connexion</h3>

            {msg && <p className="msg_green">{msg}</p>}

            <form onSubmit={handleSubmit}>

              {<label for="password">Mot de passe</label>}
              <input
                placeholder="Tapez un nouveau mot de passe pour le changer"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {<label for="complement">Votre adresse mail</label>}
              <input
                placeholder="Votre adresse email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className="form_advise">
                <em>Votre pseudo est unique et n'est pas modifiable</em></p>

              <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
              <p className="button_retour_rouge"><Link to={`/utilisateurs/infos-connexion/${user.id}`} ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></Link></p>

            </form>

            <p></p>
          </section>
        </React.Fragment>
      ))}
    </>
  )
}

export default InfoConnexionUpdate;