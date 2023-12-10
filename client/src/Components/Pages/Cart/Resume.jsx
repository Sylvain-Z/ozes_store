import { useState , useEffect } from "react";
import { Link , useLocation , useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Resume() {

  const { pathname } = useLocation(); {/* sert à changer la classname des Link en fin de composant) */}
  const navigate = useNavigate();

  // récupère les informations sur les produits stockés en localstorage
  const { cartInfo } = useSelector((state) => state.cart);

  // calcul le prix total des produits présent dans le panier
  function computeCartPrice(){
    let sum = 0;
    for (const item of cartInfo.product) {
        sum += item.quantity * item.priceEach;
    }
    return sum.toFixed(2);
  }

  // calcul de TVA
  function TVA(){
    let total = parseFloat(computeCartPrice());
    if (total == 0) {
      return "0.00";
    } else {
      total *= 0.2;
    }
    return total.toFixed(2);
  }
  // calcul du prix total de la commande
  function computeOrderTotal() {
    let total = parseFloat(computeCartPrice());
  
    if (total == 0) {
      return "0.00";
    } else {
      total = total + 6.00; // 6.00 représentent les frais de port en france métropolitaine
      return total.toFixed(2); // Retournez la valeur avec deux décimales
    }
  }

  // EFFECTUER LA COMMANDE
  
  const myuserid = localStorage.getItem("myuserid");
  const [ users, setUsers] = useState(null);  // fetch query table orders
  const [ user_id, setUser_id] = useState(null);  // fetch query table orders

  useEffect(() => {
      async function getData() { // récupère les informations de livraison de l'usager qui est connecté à son compte
          try {
              const users = await fetch("/api/v1/users/"+ myuserid);
              if (users.status === 200) {
                  const json = await users.json();
                  setUsers(json);
                  setUser_id(json[0].id);
              }
          } catch (error) {
              throw Error(error);
          }
      }
      getData();
  }, []);

  const userInfos = localStorage.getItem("userInfos");
  const [ userLS, setUserLS ] = useState([]);

  
  const [firstname, setFirstname]       = useState("");
  const [lastname, setLastname]         = useState("");
  const [email, setEmail]               = useState("");
  const [number, setNumber]             = useState("");
  const [street, setStreet]             = useState("");
  const [complement, setComplement]     = useState("");
  const [postal_code, setPostal_code]   = useState("");
  const [city, setCity]                 = useState("");
  const [phone, setPhone]               = useState("");

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
  const order_price  = computeOrderTotal(); // coût total du panier
  
  const [product_id, setProduct_id] = useState(null); // fetch query table orders_products
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [priceEach, setPriceEach] = useState(null); // prix d'un produit pour archive (potentielles promos)

  useEffect(() => {
    async function getData() { // sert à afficher les bouttons si localStorage.getItem('cart') existe
      try {
        let cartLS = localStorage.getItem('cart');
        const cartArr = JSON.parse(cartLS);
        if (cartArr) {
          setCart(cartArr.product);
          setProduct_id(cartArr.product[0].product_id);
          setSize(cartArr.product[0].size);
          setQuantity(cartArr.product[0].quantity);
          setPriceEach(cartArr.product[0].priceEach);
          
        } 
        /* for (const item of cart) {
            const json = await product.json();
            setProduct((prevProduct) => [...prevProduct, ...json]);
        } */
      } catch (error) {
        throw Error(error);
      }
    }
    getData()
  }, []);

  const [msg, setMsg] = useState(null);
  const [msg2, setMsg2] = useState(null);


  async function handleOrderLS(e) {  // envoie la commande en BDD si l'usager n'est pas connecté
    e.preventDefault();
    const res = await fetch("/api/v1/cart/new_orderLS", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, number, street, complement, postal_code, city, phone, order_price, cart : cart}),
    });
    const json = await res.json();
    setMsg(json.msg);
  }

  async function handleOrder(e) {  // envoie la commande en BDD so l'usager est connecté
    e.preventDefault();
    const res = await fetch("/api/v1/cart/new_order", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_price , user_id, cart : cart}),
    });
    const json = await res.json();
    setMsg(json.msg);
    /* 
    if (res.status === 201) {
        setTimeout(()=>{
            navigate("/le_store");
        }, 2000) */
    }  
    
  

    return (
                <>                  
                  <article className="cart_ctn-resume">
                    <h3>Résumé</h3>
                      <table className="resume">
                        <thead>
                            <tr>
                                <th className='first_col'>Sous-Total</th>
                                <th className='first_col'>{cartInfo.product.length ? computeCartPrice() : "0.00"}€</th>
                            </tr>
                        </thead>

                        <tbody className='cart_list'>
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
                          <tr>
                            <th className='first_col'>Total de la commande</th>
                            <th className='first_col'>{computeOrderTotal()}€</th>
                          </tr>
                        </tfoot>
                    </table>

                    {msg && <p className="msg_buy">{msg}</p>}
                    {msg2 && <p className="msg_buy">{msg2}</p>}

                    {!cart.length ? ( // si le panier en local storage est vide l'usager n'a pas accès à aucun boutton
                                      <>
                                      </>
                                    ) : ( // c'est ce boutton qui est visible sur la premier page du panier ( écoute de l'url )
                                          <>
                                            <Link to="/panier/info-livraison" className={pathname === "/panier" ? "" : "hidden"}><p className="continue">Continuer</p></Link>
                                            
                                            {!users ? (  // dynamise l'affichage du boutton si l'usager est connecté ou non
                                                        <>
                                                          {!userLS.lastname ? ( // si l'usager n'a pas renseigné et n'est pas connecté ses informations de livraison dans le local storage le boutton n'apparait pas
                                                                              <>
                                                                              </>
                                                                            ):(  // si l'usager n'est pas connecté et a renseigné ses informations de livraison dans le local storage le boutton apparaît
                                                                                <>
                                                                                  <Link to="/panier/info-livraison" className={pathname === "/panier/info-livraison" ? "" : "hidden"} onClick={handleOrderLS}><p className="buy">AcheterLS</p></Link>
                                                                                </>
                                                                              )}
                                                          
                                                        </>
                                                        ) : ( // si l'usager est connecté le boutton apparaît 
                                                              <>
                                                                <Link to="/panier/info-livraison" className={pathname === "/panier/info-livraison" ? "" : "hidden"} onClick={handleOrder}><p className="buy">AcheterCO</p></Link>
                                                              </>
                                                        )}
                                          </>
                                          )}
                    
                  </article>
                </>
    )
  }
  
  export default Resume;

  