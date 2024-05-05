import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/PreviousPage';
import BackToCart from '../../Cart/Components/BackToCart';

function Delivery() {

      const TOKEN = getItemWithExpiration('auth');
      const myuserid = getItemWithExpiration("myuserid");

      const [user, setUser] = useState(null);

      useEffect(() => {
            async function getUserDelivery() {
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
                                    'Authentication': `Bearer ${TOKEN}`
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
            getUserDelivery();
      }, []);


      const [cart, setCart] = useState(null);

      useEffect(() => {
            let cartLS = localStorage.getItem('cart')
            const cartArr = JSON.parse(cartLS);
            if (cartArr) {
                  setCart(cartArr.product);
            }
      }, []);

      return (
            <>
                  {!user ? (
                        <Loading />
                  ) : (
                        <>
                              <PreviousPage user={user[0]} />


                              <section className="form_section">

                                    {!cart ? (<></>) : (<BackToCart />)} {/* Affiche un lien vers une page avancée du panier celui-ci contient des articles  */}

                                    <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeYellow" />
                                    <h3 className="form_title read">Vos informations de livraison</h3>

                                    <form>
                                          <input
                                                placeholder="Prénom"
                                                type="text"
                                                name="firstname"
                                                value={user[0].firstname}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Nom"
                                                type="text"
                                                name="lastname"
                                                value={user[0].lastname}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Numéro de la rue"
                                                type="text"
                                                name="number"
                                                value={user[0].number}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Nom de la rue"
                                                type="text"
                                                name="street"
                                                value={user[0].street}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Complément d'adresse"
                                                type="text"
                                                name="complement"
                                                value={user[0].complement}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Code postale"
                                                type="text"
                                                name="postalcode"
                                                value={user[0].postal_code}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Ville"
                                                type="text"
                                                name="city"
                                                value={user[0].city}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Votre numéro de téléphone"
                                                type="tel"
                                                name="phone"
                                                value={user[0].phone}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Votre pseudo"
                                                type="hidden"
                                                name="pseudo"
                                                value={user[0].pseudo}
                                                disabled="disabled"
                                          />

                                          <p className='input_link_btn'><Link to={`/utilisateurs/infos-livraison-update/${user[0].id}`}>Modifier</Link></p>
                                    </form>
                              </section>
                        </>
                  )}
            </>
      )
}

export default Delivery;