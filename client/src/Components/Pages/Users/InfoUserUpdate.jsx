import { Link , /* useNavigate, useParams ,  useLocation */ } from 'react-router-dom';
import { useState, useEffect, useReducer } from "react";
import { /*useSelector ,  useDispatch */ } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";

function InfoUserUpdate() {
  
  // const { info } = useSelector((state) => state.user);
  // const params   = useParams();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const [firstname, setFirstname]     = useState("");
  const [lastname, setLastname]       = useState("");
  const [password, setPassword]       = useState("");
  const [email, setEmail]             = useState("");
  const [msg, setMsg] = useState(null);
    
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
                
                setFirstname(json[0].firstname);
                setLastname(json[0].lastname);
                setPassword(json[0].password);
                setEmail(json[0].email);
                
            }
        } catch (error) {
        throw Error(error);
        }
    }
    getData();
    }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/v1/users/infos-perso-update/${myuserid}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, password, email }),
    });
    const json = await res.json();
    setMsg(json.msg);
    if (res.status === 201) {
      setTimeout(()=>{ window.history.back()}, 2000)
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
    
                        <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
                        <h3 className="form_title update">Modification de vos informations personnelles</h3>

                        {msg && <p className="msg_green">{msg}</p>}

                        <form onSubmit={handleSubmit}>

                        {/* <label for="firstname">Votre prénom</label> */}
                        <input
                                placeholder="Votre prénom"
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}                          
                          />
                          {/* <label for="lastname">Votre nom</label> */}
                          <input
                                placeholder="Votre nom"
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                          />
                          {/* <label for="password">Mot de passe</label> */}
                          <input
                              placeholder="Tapez un nouveau mot de passe pour le changer"
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                          {/* <label for="complement">Votre adresse mail</label> */}
                          <input
                                placeholder="Votre adresse email"
                                type="email"
                                name="email"
                                value={email}
                                disabled="disabled"
                          />

                          <p className="form_advise">
                            <em>Contactez-nous pour changer votre adresse mail de connexion</em></p>
                          
                          <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                          <button type="button" onClick={() => window.location.href =`/utilisateurs/infos-livraison/${user.id}`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                        </form>

                        <p></p>
                      </section>
                    </>
                  ))}
    </>
  )
}

export default InfoUserUpdate;