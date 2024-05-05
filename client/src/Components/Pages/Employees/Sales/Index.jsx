import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { format } from 'date-fns-tz';

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheckCircle, faMinus } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/previousPage';

function Sales() {

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getSales() { // récupère toutes les commandes de la bdd
      try {
        const TOKEN_EMPL = getItemWithExpiration('authe');
        const orders = await (
          await fetch(FETCH_URL + "orders/all", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
          })
        ).json();
        setOrders(orders.datas);

      } catch (error) {
        throw Error(error);
      }
    }
    getSales();
  }, []);


  return (
    <>
      <PreviousPage />

      <h3>Ventes</h3>

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
              <td className='mobile_hidden'>{order.tracking_number ? (<>{order.tracking_number}</>) : (<><FontAwesomeIcon icon={faMinus} className='fontawesomeGrey' /></>)}</td>
              <td>{order.tracking_number ? (
                <>
                  <Link to={`/employes/commande/${order.id}`}>
                    <FontAwesomeIcon icon={faCheckCircle} className='fontawesomeGreen btn update_reserve' />
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/employes/commande/${order.id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} className='fontawesomeBlue btn update_reserve' />
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

export default Sales;