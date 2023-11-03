import {/*  Link , useNavigate , useParams ,  useLocation*/ } from 'react-router-dom';
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";
import PreviousPage from './Components/previousPage';

function Delivery() {
  
  // const { info } = useSelector((state) => state.user);

  const [ users, setUsers ] = useState(null);
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
                    <Loading/>
                ) : ( users.map( user =>

                  <>
                  {/* <Link to={`/utilisateurs/${user.id}`}><p className="previous_page">Votre compte</p></Link> */}

                  <PreviousPage user={user}/>

                  <section className="form_section">

                    <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeYellow" />
                    <h3 className="form_title read">Vos informations de livraison</h3>
                  
                     <form>
                      
                     <input
                            placeholder="Numéro de la rue"
                            type="text"
                            name="number"
                            value={user.number}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Nom de la rue"
                            type="text"
                            name="street"
                            value={user.street}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Complément d'adresse"
                            type="text"
                            name="complement"
                            value={user.complement}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Code postale"
                            type="text"
                            name="postalcode"
                            value={user.postal_code}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Ville"
                            type="text"
                            name="city"
                            value={user.city}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Votre numéro de téléphone"
                            type="tel"
                            name="phone"
                            value={user.phone}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Adresse email"
                            type="hidden"
                            name="email"
                            value={user.email}
                            disabled="disabled"
                      />
                      
                      <button type="button" onClick={() => window.location.href =`/utilisateurs/infos-livraison-update/${user.id}`}>Modifier mes informations</button>
                    </form>
                  </section>
                  </>
                ))}
    </>
  )
}

export default Delivery;