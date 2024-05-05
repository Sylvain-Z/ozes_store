import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashCan, faCirclePlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/previousPage';


function AccountManagement() { // page accessible uniquement par les compte utilisateurs ayant un rôle administrateur

  const [employees, setEmployees] = useState(null); // affiche la liste de tous les profils existants

  useEffect(() => {
    async function getEmployees() {
      try {
        const TOKEN_EMPL = getItemWithExpiration('authe');
        const employees = await (
          await fetch(FETCH_URL + "employees/all", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
          })
        ).json();
        setEmployees(employees.datas);

      } catch (error) {
        throw Error(error);
      }
    }
    getEmployees();
  }, []);

  return (
    <>
      <PreviousPage />

      <div className='reserve_actions'>
        <div className='form_reserve'>
          <Link to="/employes/gestion-comptes/creer-compte" className="reserve_btn">
            <p><FontAwesomeIcon icon={faCirclePlus} className="faIcon" />Profil</p>
          </Link>
        </div>
      </div>

      <table className="reserve">
        <thead>
          <tr>
            <th className='first_col'>Nom</th>
            <th>
              <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey' />
            </th>
            <th>
              <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey' />
            </th>
          </tr>
        </thead>
        {!employees ? (
          <Loading />
        ) : (employees.map(employee =>


          <tbody className={`products_list`} key={employee.id}>
            <tr>
              <td className='first_col'>
                {employee.role === 1 ? (<img src={require("../../../../assets/img/Administrateur.png")} alt="pictograme buste" />) : (<img src={require("../../../../assets/img/Moderateur.png")} alt="pictograme buste" />)}
                <p>{employee.firstname} {employee.lastname}</p>
              </td>
              <td>
                <Link to={`/employes/gestion-comptes/${employee.id}`}>
                  <FontAwesomeIcon icon={faEye} className='fontawesomeBlue btn update_reserve' />
                </Link>
              </td>
              <td>
                <Link to={`/employes/gestion-comptes/suppression/${employee.id}`}>
                  <FontAwesomeIcon icon={faTrashCan} className='fontawesomeRed btn delete_reserve' />
                </Link>
              </td>
            </tr>
          </tbody>

        ))}
      </table>
    </>
  )
}

export default AccountManagement;