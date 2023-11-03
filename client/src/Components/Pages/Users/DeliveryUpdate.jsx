import { Link , /* useNavigate, useParams ,  useLocation */ } from 'react-router-dom';
import { useState, useEffect, useReducer } from "react";
import { /*useSelector ,  useDispatch */ } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";

function DeliveryUpdate() {
  
  // const { info } = useSelector((state) => state.user);
  // const params   = useParams();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [users, setUsers]               = useState(null);
  const [number, setNumber]             = useState("");
  const [street, setStreet]             = useState("");
  const [complement, setComplement]     = useState("");
  const [postal_code, setPostal_code]   = useState("");
  const [city, setCity]                 = useState("");
  const [phone, setPhone]               = useState("");
  const [email, setEmail]               = useState("");
  const [msg, setMsg]                   = useState(null);
    
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
                
                setNumber(json[0].number);
                setStreet(json[0].street);
                setComplement(json[0].complement);
                setPostal_code(json[0].postal_code);
                setCity(json[0].city);
                setPhone(json[0].phone);
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
    const res = await fetch(`/api/v1/users/infos-livraison-update/${myuserid}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, street, complement, postal_code, city, phone, email }),
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
                      <Link to={`/utilisateurs/infos-livraison/${user.id}`}><p className="previous_page">Retour</p></Link>

                      <section className="form_section">
    
                        <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeYellow" />
                        <h3 className="form_title update">Modification de vos informations de livraison</h3>

                        {msg && <p className="msg_green">{msg}</p>}

                        <form onSubmit={handleSubmit}>

                          {/* <label for="number">Numéro de la rue</label> */}
                          <input
                                placeholder="Numéro de la rue"
                                type="number"
                                name="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}                          
                          />
                          {/* <label for="street">Nom de la rue</label> */}
                          <input
                                placeholder="Nom de la rue"
                                type="text"
                                name="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                          />
                          {/* <label for="complement">Complément d'adresse</label> */}
                          <input
                                placeholder="Complément d'adresse"
                                type="text"
                                name="complement"
                                value={complement}
                                onChange={(e) => setComplement(e.target.value)}
                          />
                          {/* <label for="postal_code">Code postal</label> */}
                          <input
                                placeholder="Code postal"
                                type="text"
                                name="postal_code"
                                value={postal_code}
                                onChange={(e) => setPostal_code(e.target.value)}
                          />
                          {/* <label for="city">Ville</label> */}
                          <input
                                placeholder="Ville"
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                          />
                          <input
                            placeholder="Votre numéro de téléphone"
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          {/* <label for="email">Nous contacter pour changer votre adresse mail</label> */}
                          <input
                            placeholder="Votre adresse email"
                            type="hidden"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                         
                          <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                          <button type="button" onClick={() => window.location.href =`/utilisateurs/infos-livraison/${user.id}`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                        </form>
                      </section>
                    </>
                  ))}
    </>
  )
}

export default DeliveryUpdate;