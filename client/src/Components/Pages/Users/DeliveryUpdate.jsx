import { useNavigate, Link ,  /*useParams ,  useLocation */ } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector , /* useDispatch */ } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";

function DeliveryUpdate() {
  
  const { info } = useSelector((state) => state.user);
  const [ users, setUsers ] = useState(null);
  // const params   = useParams();

  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const [number, setNumber]       = useState("");
  const [street, setStreet]       = useState("");
  const [complement, setComplement]       = useState("");
  const [postal_code, setPostal_code]       = useState("");
  const [city, setCity]       = useState("");

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


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/v1/users/infos-livraison-update/${info.id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, street, complement, postal_code, city }),
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
                      <Link to={`/utilisateurs/infos-livraison/${user.id}`}><p className="previous_page">Retour</p></Link>

                      <section className="form_section">
    
                        <FontAwesomeIcon icon={faTruckFast} size="lg" style={{color: "rgb(255, 196, 50)"}}/>
                        <h3 className="form_title update">Modification de vos informations de livraison</h3>
                        <form onSubmit={handleSubmit}>
                        <input
                                placeholder={user.number}
                                type="number"
                                name="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}                            
                          />
                          <input
                                placeholder={user.street}
                                type="text"
                                name="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                          />
                          
                          <input
                                placeholder={user.complement}
                                type="text"
                                name="complement"
                                value={complement}
                                onChange={(e) => setComplement(e.target.value)}
                          />
                          <input
                                placeholder={user.postal_code}
                                type="text"
                                name="postal_code"
                                value={postal_code}
                                onChange={(e) => setPostal_code(e.target.value)}
                          />
                          <input
                                placeholder={user.city}
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                          />

                          {/* <button type="submit"><FontAwesomeIcon icon={faCircleCheck} style={{color: "#21832b",}} /></button>
                          <button type="button" onClick={() => window.history.back()}><FontAwesomeIcon icon={faDeleteLeft} style={{color: "#d10a23",}} /></button> */}

                          <Link to={`/utilisateurs/infos-livraison/${user.id}`}><button type="submit"><FontAwesomeIcon icon={faCircleCheck} style={{color: "#21832b",}} /></button></Link>
                          <Link to={`/utilisateurs/infos-livraison/${user.id}`}><button type="button"><FontAwesomeIcon icon={faDeleteLeft} style={{color: "#d10a23",}} /></button></Link>
                        </form>
                      </section>
                    </>
                  ))}
    </>
  )
}

export default DeliveryUpdate;