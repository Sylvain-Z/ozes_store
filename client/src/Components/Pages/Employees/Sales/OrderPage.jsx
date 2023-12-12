import { Link , useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../../Containers/Loading/Index";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function OrderPage (){

    const params   = useParams();
    const navigate = useNavigate();

    const [ orders , setOrders ] = useState("");
    
    const [tracking_number , setTracking_number] = useState("");
    const [id , setId] = useState("");
    const [msg , setMsg] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const orders = await fetch("/api/v1/orders/" + params.order_id); // récupère les informations d'une commande par rapport à son id
                if(orders.status === 404) {
                    navigate("/not-found");
                }
                if(orders.status === 200){
                    const json = await orders.json();
                    setOrders(json);
                    setTracking_number(json[0].tracking_number);
                    setId(json[0].order_id);
                } 
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, []);
               
                async function handleSubmit(e) {
                    e.preventDefault();
                    const res = await fetch(`/api/v1/orders/tracking_number/`+ params.id, { // met à jour le numéro de suivi d'une commande par rapport à son id
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ tracking_number , id }),
                    });
                    const json = await res.json();
                    setMsg(json.msg);
        
                    if (res.status === 201) {
                        setTimeout(()=>{setMsg("")}, 5000)
                    }
                };
                            
    return (
        <>
            <p className="previous_page"><Link to="/employes/ventes">Retour à la liste des commandes</Link></p>

            {!orders ? (<></>) :(
                                    <>
                                        <h3>Commande n° : {orders[0].order_id}</h3>
                                        <div className="order_page">
                                            <p>{orders[0].pseudo}</p>
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
                    <Loading/>
                ) : ( orders.map( order =>
                        <>
                            <div className='product_grid'>
                                <figure><Link to={`/le_store/${order.title_url}/${order.id}`}>
                                    <img src={`/${order.file_name}`} alt={order.caption}/>
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

            <section className="form_section">  {/*  Formulaire de mise à jour du numéro de suivi */}

                <h3 className="form_title read">Numéro de suivi du coli</h3>

                <form onSubmit={handleSubmit}>

                    {msg && <p className="msg_green">{msg}</p>}

                    <input className="form_input"
                        required
                        placeholder="Numéro de suivi"
                        type="text"
                        name="tracking_number"
                        value={tracking_number}
                        onChange={(e) => setTracking_number(e.target.value.replace(/[^a-zA-Z-_0-9°]/g, ''))}               
                    />

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>

                </form>
            </section>


        </>
    )
};


export default OrderPage;