import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";


function Reserve() {

  const [ products, setProducts ] = useState(null);
    
  useEffect(() => {
          async function getData() {
              try {
                  const products = await (
                      await fetch("/api/v1/products/galery")
                  ).json();
                  setProducts(products.datas);
                          
          } catch (error) {
              throw Error(error);
          }
      }
      getData();
  }, []);

  return (
      <>
        <Link to="/employes"><p className="previous_page">Retour au tableau de bord</p></Link>

          <table className="reserve">
            <thead>
                <tr>
                    <th className='img_cell'>Nom</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>
                      <Link to={"/employes/stock/add-product"}>
                        <FontAwesomeIcon icon={faSquarePlus} className='fontawesomeGreen'/>
                      </Link>
                    </th>
                </tr>
            </thead>
              {!products ? (
                  <Loading/>
              ) : ( products.map( product =>

                      
                        <tbody className={`products_list`}>
                            <tr>
                              <td className='img_cell'>
                                <img src={require("../../../assets/img/store/" + product.file_name1)} alt={product.caption1}/>
                                <p>{product.title}</p>
                              </td>
                              <td><p>{product.price}€</p></td>
                              <td><p>{product.stock_quantity}</p></td>
                              <td>
                                <Link to={`/employes/stock/${product.cate_url}/${product.title_url}`}>
                                  <FontAwesomeIcon icon={faPenToSquare} />
                                </Link>
                              </td>
                            </tr>
                        </tbody>
                      
                  ))}
          </table>
      </>
  )
}

export default Reserve;