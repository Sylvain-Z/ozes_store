import { useNavigate, Link ,  /*useParams ,  useLocation */ } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector , /* useDispatch */ } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";

function InfoUserUpdate() {
  
  const { info } = useSelector((state) => state.user);
  const [ users, setUsers ] = useState(null);
  // const params   = useParams();

  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const [firstname, setFirstname]       = useState("");
  const [lastname, setLastname]       = useState("");
  const [email, setEmail]       = useState("");
  const [birthdate, setBirthdate]       = useState("");
  const [password, setPassword]       = useState("");


  const [msg, setMsg] = useState(null);
    
  useEffect(() => {
          async function getData() {
              try {
                const users = await fetch("/api/v1/users/"+ info.id);
                if (users.status === 404) {
                  navigate("users/not-found");
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

  console.log("UPDATE INFO ---->", info.id)


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/v1/users/infos-perso-update/${info.id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, birthdate, password }),
    });
    const json = await res.json();
    setMsg(json.msg);

    if (res.status === 201) {
      window.history.back();
    }
}

  return (
    <>
          {!users ? (
                      <Loading/>
                  ) : ( users.map( user =>

                    <>
                      <Link to={`/utilisateurs/infos-perso/${user.id}`}><p className="previous_page">Retour</p></Link>

                      <section className="form_section">

                      <FontAwesomeIcon icon={faIdBadge} size="lg" style={{color: "rgb(255, 196, 50)"}}/> 
                      <h3 className="form_title update">Modification de vos informations personnelles</h3>

                      <form onSubmit={handleSubmit}>
                        <input
                              placeholder={user.firstname}
                              type="text"
                              name="firstname"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                              placeholder={user.lastname}
                              type="text"
                              name="lastname"
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                        />
                        <input
                              placeholder={user.email}
                              type="text"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                              placeholder={user.birthdate}
                              type="date"
                              name="birthdate"
                              value={birthdate}
                              onChange={(e) => setBirthdate(e.target.value)}
                        />
                        <input
                              placeholder="Tapez un nouveau mot de passe pour le changer"
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* <button type="submit"><FontAwesomeIcon icon={faCircleCheck} style={{color: "#21832b",}} /></button>
                        <button type="button" onClick={() => window.history.back()}><FontAwesomeIcon icon={faDeleteLeft} style={{color: "#d10a23",}} /></button> */}

                        <Link to={`/utilisateurs/infos-perso/${user.id}`}><button type="submit"><FontAwesomeIcon icon={faCircleCheck} style={{color: "#21832b",}} /></button></Link>
                        <Link to={`/utilisateurs/infos-perso/${user.id}`}><button type="button"><FontAwesomeIcon icon={faDeleteLeft} style={{color: "#d10a23",}} /></button></Link>


                      </form>
                    </section>
                  </>
                ))}
    </>
  )
}

export default InfoUserUpdate;