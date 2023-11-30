import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye , faTrashCan , faCirclePlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/previousPage';


function AccountManagement() {

  const [ employees, setEmployees ] = useState(null);
    
  useEffect(() => {
          async function getData() {
              try {
                  const employees = await (
                      await fetch("/api/v1/employees/all")
                  ).json();
                  setEmployees(employees.datas);
                          
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
                    <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey'/>
                  </th>
                  <th>
                    <FontAwesomeIcon icon={faMinus} className='fontawesomeGrey'/>
                  </th>
              </tr>
          </thead>
            {!employees ? (
                <Loading/>
            ) : ( employees.map( employee =>

                    
                      <tbody className={`products_list`}>
                          <tr>
                            <td className='first_col'>
                              {employee.role === 1 ? (<img src={require("../../../../assets/img/Administrateur.png")} alt="pictograme buste"/>) : (<img src={require("../../../../assets/img/Moderateur.png")} alt="pictograme buste"/>)}
                              <p>{employee.firstname} {employee.lastname}</p>
                            </td>
                            <td>
                              <Link to={`/employes/gestion-comptes/${employee.id}`}>
                                <FontAwesomeIcon icon={faEye} className='fontawesomeBlue btn update_reserve'/>
                              </Link>
                            </td>
                            <td>
                              <Link to={`/employes/gestion-comptes/suppression/${employee.id}`}>
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

export default AccountManagement;