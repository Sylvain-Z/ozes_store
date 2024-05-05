import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import Loading from "../../Containers/Loading/Index";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function OrderPage() {

    const params = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const [tracking_number, setTracking_number] = useState("");
    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");

    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getOrders() {
            try {
                const order = await fetch(FETCH_URL + "orders/" + params.order_id, { // récupère les informations d'une commande par rapport à son id
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                    },
                });
                if (order.status === 404) {
                    navigate("/not-found");
                }
                if (order.status === 200) {
                    const json = await order.json();
                    setOrder(json);
                    setTracking_number(json[0].tracking_number);
                    setId(json[0].order_id);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getOrders();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "orders/tracking_number/" + params.id, { // met à jour le numéro de suivi d'une commande par rapport à son id
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
            body: JSON.stringify({ tracking_number, id }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            setTimeout(() => { setMsg("") }, 5000)
        }
    };

    return (
        <>
            <p className="previous_page"><Link to="/employes/ventes">Retour à la liste des commandes</Link></p>

            {!order ? (<></>) : (
                <>
                    <h3>Commande n° : {order[0].order_id}</h3>
                    <div className="order_page">
                        <p>{order[0].pseudo}</p>
                        <p>{order[0].firstname} {order[0].lastname}</p>
                        <p>{order[0].number} {order[0].street}</p>
                        <p>{order[0].complement}</p>
                        <p>{order[0].postal_code}</p>
                        <p>{order[0].city}</p>
                        <p>{order[0].phone}</p>
                        <p>{order[0].email}</p>
                    </div>
                </>
            )}

            <div className="shop">
                {!order ? (
                    <Loading />
                ) : (order.map(item =>

                    <React.Fragment key={item.id}>
                        <div className='product_grid'>
                            <figure><Link to={`/le_store/${item.title_url}/${item.id}`}>
                                <img src={`/${item.file_name}`} alt={item.caption} />
                                <figcaption>
                                    <p>Référence : {item.reference}</p>
                                    <p>Quantité : {item.quantity}</p>
                                    <p>{item.title}</p>
                                    <p>{item.final_price}€</p>
                                </figcaption></Link>
                            </figure>
                        </div>
                    </React.Fragment>

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

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>

                </form>
            </section>


        </>
    )
};


export default OrderPage;