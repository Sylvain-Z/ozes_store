import { useState, useEffect } from 'react';
import { Link , useParams} from "react-router-dom";
import { format } from 'date-fns-tz';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare , faCheckCircle , faMinus } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/PreviousPage';

function Orders() {

  const params   = useParams();

  const [ users, setUsers ] = useState(null);
  const myuserid = localStorage.getItem("myuserid");

  useEffect(() => {
    async function getData() {
        try {
            const users = await fetch("/api/v1/users/"+ myuserid);
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

  const [ orders, setOrders ] = useState(null);

  useEffect(() => {
    async function getData() { // récupère les commandes de l'usager
        try {    
          const orders = await fetch("/api/v1/cart/order_user/"+ params.id);
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
        {!users ? (<> </>) :(
                              <PreviousPage user={users[0]}/>
                            )}  

        <h3>Ventes</h3>

        <table className="reserve">
          <thead>
              <tr>
                  <th className='first_col'>N° de commandes</th>
                  <th>Date</th>
                  <th>Prix</th>
                  <th>N° de suivi</th>
                  <th>
                    <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey'/>
                  </th>
              </tr>
          </thead>
                    
          <tbody className='products_list'>
            {!orders ? (
                <Loading/>
            ) : ( orders.map( order =>

                          <tr>
                            <td className='first_col'>{order.id}</td>
                            <td>{format(new Date(order.order_date), 'dd-MM-yyyy')}</td>
                            <td>{order.order_price}€</td>
                            <td>{order.tracking_number}</td>
                            <td>{order.tracking_number.length ? (
                                                            <>
                                                              <Link to={`/utilisateurs/vos-commandes/${order.user_id}/${order.id}`}>
                                                                <FontAwesomeIcon icon={faCheckCircle} className='fontawesomeGreen btn update_reserve'/>
                                                              </Link>
                                                            </>
                                                          ) :(
                                                                  <>
                                                                  <Link to={`/utilisateurs/vos-commandes/${order.user_id}/${order.id}`}>
                                                                    <FontAwesomeIcon icon={faPenToSquare} className='fontawesomeBlue btn update_reserve'/>
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