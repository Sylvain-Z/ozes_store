import { Link , /* useNavigate , useParams ,  useLocation*/ } from 'react-router-dom';
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/PreviousPage';
import BackToCart from '../../Cart/Components/BackToCart';

function Delivery() {
  
  // const { info } = useSelector((state) => state.user);
  const myuserid = localStorage.getItem("myuserid");

  const [ users, setUsers ] = useState(null);

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

    
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      let cartLS = localStorage.getItem('cart')
      const cartArr = JSON.parse(cartLS);
      if (cartArr) {
        setCart(cartArr.product);
      }
    }, []);

  return (
    <>
      {!users ? (
                  <Loading/>
            ) : ( users.map( user =>

            <>
            
            <PreviousPage user={user}/>
            

            <section className="form_section">

                  {!cart ? ( <></>) : ( <BackToCart/> )} {/* Affiche un lien vers une page avancée du panier celui-ci contient des articles  */}

                  <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeYellow" />
                  <h3 className="form_title read">Vos informations de livraison</h3>
            
                  <form>
                  <input
                        placeholder="Prénom"
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        disabled="disabled"
                  />
                  <input
                        placeholder="Nom"
                        type="text"
                        name="lastname"
                        value={user.lastname}
                        disabled="disabled"
                  />
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
                        placeholder="Votre pseudo"
                        type="hidden"
                        name="pseudo"
                        value={user.pseudo}
                        disabled="disabled"
                  />
                  
                  <p className='input_link_btn'><Link to={`/utilisateurs/infos-livraison-update/${user.id}`}>Modifier mes informations</Link></p>
                  </form>
            </section>
            </>
            ))}
    </>
  )
}

export default Delivery;