import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { FETCH_URL } from '../../../assets/const';
import { getItemWithExpiration } from '../../../assets/functions';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Resume() {

  const { pathname } = useLocation(); /* sert à changer la classname des Link en fin de composant) */
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  // récupère les informations sur les produits stockés en localstorage
  const { cartInfo } = useSelector((state) => state.cart);

  // calcul le prix total des produits présent dans le panier
  function computeCartPrice() {
    let sum = 0;
    for (const item of cartInfo.product) {
      sum += item.quantity * item.priceEach;
    }
    return sum.toFixed(2);
  }

  // calcul de TVA
  function TVA() {
    let total = parseFloat(computeCartPrice());
    if (total === 0) {
      return "0.00";
    } else {
      total *= 0.2;
    }
    return total.toFixed(2);
  }

  // calcul du prix total de la commande
  function computeOrderTotal() {
    let total = parseFloat(computeCartPrice());

    if (total === 0) {
      return "0.00";
    } else {
      total = total + 6.00; // 6.00 représentent les frais de port en france métropolitaine
      return total.toFixed(2); // Retournez la valeur avec deux décimales
    }
  }

  // converti le prix total en centime pour la fonction de paiement 
  const [amount, setAmount] = useState(null);
  useEffect(() => {
    let amountConvert = parseFloat(computeOrderTotal() * 100);
    if (amountConvert) {
      setAmount(amountConvert);
    }
  }, []);

  // EFFECTUER LA COMMANDE

  const TOKEN = getItemWithExpiration('auth');
  const myuserid = getItemWithExpiration("myuserid");
  const [user, setUser] = useState(null);  // fetch query table orders
  const [user_id, setUser_id] = useState(null);  // fetch query table orders

  useEffect(() => {
    async function getUserCartResume() { // récupère les informations de livraison de l'usager qui est connecté à son compte
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
          setUser_id(json[0].id);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getUserCartResume();
  }, []);

  const userInfos = localStorage.getItem("userInfos"); // récupère les infos de livraison de l'usager en Local Storage (sans compte client) 
  const [userLS, setUserLS] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => { // récupère les infos de livraison de l'usager en Local Storage (sans compte client) 
    if (userInfos) {
      let userInfosLS = userInfos;
      const userInfosArr = JSON.parse(userInfosLS);
      if (userInfosArr) {
        setUserLS(userInfosArr);
        setFirstname(userInfosArr.firstname);
        setLastname(userInfosArr.lastname);
        setEmail(userInfosArr.email);
        setNumber(userInfosArr.number);
        setStreet(userInfosArr.street);
        setComplement(userInfosArr.complement);
        setPostal_code(userInfosArr.postal_code);
        setCity(userInfosArr.city);
        setPhone(userInfosArr.phone);
      }
    }
  }, []);


  //  récupère les informations sur les produits stockés en localstorage

  const [cart, setCart] = useState([]);
  const order_price = computeOrderTotal(); // coût total du panier

  useEffect(() => {
    async function getData() { // sert à afficher les bouttons si localStorage.getItem('cart') existe
      try {
        let cartLS = localStorage.getItem('cart');
        const cartArr = JSON.parse(cartLS);
        if (cartArr) {
          setCart(cartArr.product);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData()
  }, []);

  const [userLs_Id, setUserLs_Id] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function getData() { // sert à créer un Id aléatoire pour l'utilisateur qui achète sans se créer de compte client
      try {
        let randomId = uuidv4().slice(0, 16); // à chaque chargement du composant une chaine de 16 caractères aléatoire sera stocké
        setUserLs_Id(randomId);
      } catch (error) {
        throw Error(error);
      }
    }
    getData()
  }, []);

  // STRIPE

  // fonctions de paiement et envoie de la commande en base de données

  async function handleSubmit(e) {  // envoie la commande en BDD si l'usager n'est pas connecté
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({  // paiement stripe
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("Token Généré: ", paymentMethod);
      // envoie du token au backend
      try {
        const { id } = paymentMethod;
        const response = await fetch(FETCH_URL + "stripe/charge", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount, id: id, returnUrl: "http://localhost:3000/le_store" }),  // mettre à jour l'url 
        });

        // envoie de la commande en base de données Version Local Storage
        if (!user && userLS.lastname) { // si l'usager n'est pas connecté et a renseigné ses informations de livraison dans le local storage c'est ce code qui sera exécuté
          const res = await fetch(FETCH_URL + "orders/new_orderLS", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userLs_Id, firstname, lastname, email, number, street, complement, postal_code, city, phone, order_price, cart: cart }),
          });
          const json = await res.json();
          setMsg(json.msg);

          if (res.status === 201) {
            localStorage.removeItem("cart"); // vide le panier
            navigate("/remerciements");
          }
        }
        // envoie de la commande en base de données Version Compte Client
        if (user) {
          const res = await fetch(FETCH_URL + "orders/new_order", { // si l'usager est connecté c'est ce code qui sera exécuté
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_price, user_id, cart: cart }),
          });
          const json = await res.json();
          setMsg(json.msg);

          if (res.status === 201) {
            localStorage.removeItem("cart"); // vide le panier
            setTimeout(() => {
              navigate("/remerciements");
            }, 2000)
          }
        }

      } catch (error) {
        throw Error(error);
      };
    } else {
      console.log("Erreur", error);
    }
  }

  return (
    <>
      <article className="cart_ctn-resume">
        <h3 className={pathname !== "/panier/paiement" ? "" : "hidden"}>Résumé</h3> {/* Ce titre n'apparaît pas sur la page de paiement */}
        <table className="resume">
          <thead className={pathname !== "/panier/paiement" ? "" : "hidden"}> {/* Ce bloc n'apparaît pas sur la page de paiement */}
            <tr>
              <th className='first_col'>Sous-Total</th>
              <th className='first_col'>{cartInfo.product.length ? computeCartPrice() : "0.00"}€</th>
            </tr>
          </thead>

          <tbody className={pathname !== "/panier/paiement" ? "cart_list" : "hidden"}> {/* Ce bloc n'apparaît pas sur la page de paiement */}
            <tr>
              <td className='first_col tva'>TVA 20% incluse</td>
              <td className='first_col tva'>{TVA()}€</td>
            </tr>
            <tr>
              <td className='first_col'>Frais de port</td>
              <td className='first_col'>{cartInfo.product.length ? "6.00" : "0.00"}€</td>
            </tr>
          </tbody>

          <tfoot>
            <tr> {/* Seul ce bloc apparaît sur la page de paiement */}
              <th className='first_col'>Total de la commande</th>
              <th className='first_col'>{computeOrderTotal()}€</th>
            </tr>
          </tfoot>
        </table>

        {!cart.length ? ( // si le panier en local storage est vide l'usager n'a pas accès à aucun boutton
          <>
          </>
        ) : ( // ces bouttons sont, respectivement, visible sur les deux premières page du panier
          <>
            <Link to="/panier/info-livraison" className={pathname === "/panier" ? "" : "hidden"}><p className="continue">Continuer</p></Link>

            {!userInfos ? (
              <>
                {!user ? (<></>) : (<><Link to="/panier/paiement" className={pathname === "/panier/info-livraison" ? "continuelink" : "hidden"}><p className="continue">Continuer</p></Link></>)}
              </>
            ) : (
              <>
                <Link to="/panier/paiement" className={pathname === "/panier/info-livraison" ? "continuelink" : "hidden"}><p className="continue">Continuer</p></Link>
              </>
            )}
          </>
        )}

        <form onSubmit={handleSubmit} className={pathname === "/panier/paiement" ? "payment" : "hidden"}> {/* Ce bloc n'apparaît que sur la page de paiement */}

          <CardElement options={{ hidePostalCode: true }} />
          <button type="submit" className="buy">
            Payer
          </button>

          {msg && <p className="msg_buy">{msg}</p>}

        </form>

      </article>
    </>
  )
}

export default Resume;

