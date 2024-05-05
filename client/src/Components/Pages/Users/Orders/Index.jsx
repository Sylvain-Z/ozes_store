import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns-tz';

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMinus } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/PreviousPage';

function Orders() {

  const params = useParams();

  const [user, setUser] = useState(null);
  const TOKEN = getItemWithExpiration('auth');
  const myuserid = getItemWithExpiration("myuserid");

  useEffect(() => {
    async function getOrderUser() {
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
          },
        });
        if (user.status === 200) {
          const json = await user.json();
          setUser(json);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getOrderUser();
  }, []);

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getData() { // récupère les commandes de l'usager
      try {
        const orders = await fetch(FETCH_URL + "orders/order_user/" + params.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${TOKEN}`,
          },
        });
        if (orders.status === 200) {
          const json = await orders.json();
          setOrders(json);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData();
  }, []);


  return (
    <>
      {!user ? (<></>) : (
        <PreviousPage user={user[0]} />
      )}

      <h3>Mes commandes</h3>

      <table className="reserve">
        <thead>
          <tr>
            <th className='first_col'>N° de commandes</th>
            <th className='mobile_hidden'>Date</th>
            <th>Prix</th>
            <th className='mobile_hidden'>N° de suivi</th>
            <th>
              <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey' />
            </th>
          </tr>
        </thead>

        <tbody className='products_list'>
          {!orders ? (
            <Loading />
          ) : (orders.map(order =>

            <tr key={order.id}>
              <td className='first_col'>{order.id}</td>
              <td className='mobile_hidden'>{format(new Date(order.order_date), 'dd-MM-yyyy')}</td>
              <td>{order.order_price}€</td>
              <td className='mobile_hidden'>{order.tracking_number}</td>
              <td>{order.tracking_number ? (
                <>
                  <Link to={`/utilisateurs/vos-commandes/${order.user_id}/${order.id}`}>
                    <FontAwesomeIcon icon={faEye} className='fontawesomeGreen btn update_reserve' />
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/utilisateurs/vos-commandes/${order.user_id}/${order.id}`}>
                    <FontAwesomeIcon icon={faEye} className='fontawesomeBlue btn update_reserve' />
                  </Link>
                </>
              )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Orders;