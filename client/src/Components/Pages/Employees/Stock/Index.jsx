import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faCirclePlus, faMinus, faTag } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/previousPage';


function Reserve() {

  const [products, setProducts] = useState(null);  // stocke les informations de tous les produits de la base de donnée

  useEffect(() => {
    async function getProductStock() {
      try {
        const products = await (
          await fetch(FETCH_URL + "products/galery")
        ).json();
        setProducts(products.datas);

      } catch (error) {
        throw Error(error);
      }
    }
    getProductStock();
  }, []);

  return (
    <>
      <PreviousPage />

      <div className='reserve_actions'>
        <div className='form_reserve'>
          <Link to="/employes/stock/ajouter-produit" className="reserve_btn">
            <p><FontAwesomeIcon icon={faCirclePlus} className="faIcon" />Article</p>
          </Link>
          <Link to="/employes/stock/categories" className="reserve_btn">
            <p><FontAwesomeIcon icon={faTag} className="faIcon" />Catégories</p>
          </Link>
        </div>
      </div>

      <table className="reserve">
        <thead>
          <tr>
            <th className='first_col'>Produit</th>
            <th>Prix</th>
            <th>
              <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey' />
            </th>
            <th>
              <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey' />
            </th>
          </tr>
        </thead>

        <tbody className='products_list'>
          {!products ? (
            <Loading />
          ) : (products.map(product =>

            <tr key={product.id}>
              <td className='first_col'>
                <img src={`/${product.file_name}`} alt={product.caption} />
                <p>{product.title}</p>
              </td>
              <td><p>{product.price}€</p></td>
              <td>
                <Link to={`/employes/stock/actualiser/${product.id}`}>
                  <FontAwesomeIcon icon={faPenToSquare} className='fontawesomeBlue btn update_reserve' />
                </Link>
              </td>
              <td>
                <Link to={`/employes/stock/suppression/${product.id}`}>
                  <FontAwesomeIcon icon={faTrashCan} className='fontawesomeRed btn delete_reserve' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Reserve;