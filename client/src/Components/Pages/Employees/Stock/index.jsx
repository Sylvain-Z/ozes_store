import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare , faTrashCan , faCirclePlus, faMinus , faTag } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading";
import PreviousPage from '../Components/previousPage';


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
        <PreviousPage/>

        <div className='reserve_actions'>
          <div className='form_reserve'>
            <button onClick={() => window.location.href ="/employes/stock/ajouter-produit"}>
              <p className='reserve_btn'><FontAwesomeIcon icon={faCirclePlus} className="faIcon" />Article</p>
            </button>
            <button onClick={() => window.location.href ="/employes/stock/categories"}>
              <p className='reserve_btn'><FontAwesomeIcon icon={faTag} className="faIcon" />Catégories</p>
            </button>
          </div>
        </div>

        <table className="reserve">
          <thead>
              <tr>
                  <th className='first_col'>Nom</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>
                    <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey'/>
                  </th>
                  <th>
                    <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey'/>
                  </th>
              </tr>
          </thead>
            {!products ? (
                <Loading/>
            ) : ( products.map( product =>

                    
                      <tbody className={`products_list`}>
                          <tr>
                            <td className='first_col'>
                              <img src={require("../../../../assets/img/store/" + product.file_name)} alt={product.caption}/>
                              <p>{product.title}</p>
                            </td>
                            <td><p>{product.price}€</p></td>
                            <td><p>{product.stock_quantity}</p></td>
                            <td>
                              <Link to={`/employes/stock/actualiser/${product.id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className='fontawesomeBlue btn update_reserve'/>
                              </Link>
                            </td>
                            <td>
                              <Link to={`/employes/stock/suppression/${product.id}`}>
                              <FontAwesomeIcon icon={faTrashCan} className='fontawesomeRed btn delete_reserve'/>
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