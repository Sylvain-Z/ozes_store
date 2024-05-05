import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import Loading from "../../Containers/Loading/Index";

function OrderUserPage() {

    const params = useParams();
    const navigate = useNavigate();

    const [orders, setOrders] = useState(null);

    const [tracking_number, setTracking_number] = useState("");
    const [id, setId] = useState(""); // le champ du formulaire n'est pas nécessaire, cependant la state pour le "body: JSON.stringify({ answer , id })"" est obligatoire

    useEffect(() => {
        async function getOrderUserPage() {
            try {
                const TOKEN = getItemWithExpiration('auth');
                const orders = await fetch(FETCH_URL + "orders/" + params.user_id + "/" + params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN}`
                    }
                });

                if (orders.status === 404) {
                    navigate("/not-found");
                }
                if (orders.status === 200) {
                    const json = await orders.json();
                    setOrders(json);
                    setTracking_number(json[0].tracking_number);
                    setId(json[0].order_id);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getOrderUserPage();
    }, []);

    return (
        <>


            {!orders ? (
                <>
                </>
            ) : (
                <>
                    <p className="previous_page"><Link to={`/utilisateurs/vos-commandes/${orders[0].user_id}`}>Retour à la liste des commandes</Link></p>

                    <h3>Commande n° : {orders[0].order_id}</h3>
                    <p className="tracking_number">Numéro de suivi : {orders[0].tracking_number}</p>
                    <div className="order_page">
                        <p>{orders[0].firstname} {orders[0].lastname}</p>
                        <p>{orders[0].number} {orders[0].street}</p>
                        <p>{orders[0].complement}</p>
                        <p>{orders[0].postal_code}</p>
                        <p>{orders[0].city}</p>
                        <p>{orders[0].phone}</p>
                        <p>{orders[0].email}</p>
                    </div>
                </>
            )}

            <div className="shop">
                {!orders ? (
                    <Loading />
                ) : (orders.map(order =>
                    <>
                        <div className='product_grid' key={order.id}>
                            <figure><Link to={`/le_store/${order.title_url}/${order.id}`}>
                                <img src={`/${order.file_name}`} alt={order.caption} />
                                <figcaption>
                                    <p> Référence : {order.reference}</p>
                                    <p>Quantité : {order.quantity}</p>
                                    <p>{order.title}</p>
                                    <p>{order.final_price}€</p>
                                </figcaption></Link>
                            </figure>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
};


export default OrderUserPage;