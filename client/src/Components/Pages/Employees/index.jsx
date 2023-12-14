import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FETCH_URL } from '../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faEuroSign, faMessage, faWarehouse, faBarsProgress } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading/Index";

function Desk() {

  const [employees, setEmployees] = useState(null);
  const myemployeeid = localStorage.getItem("myemployeeid");

  useEffect(() => {
    async function getData() {
      try {
        let id = "";
        if (!myemployeeid) {
              return
        } else {
              id = myemployeeid;
        }
        const employees = await fetch(FETCH_URL + "employees/" + id);

        if (employees.status === 200) {
          const json = await employees.json();
          setEmployees(json);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getData();
  }, []);

  return (
    <>
      {!employees ? (
        <Loading />
      ) : (employees.map(employee =>
        <React.Fragment key={employee.id}>

          <h2>Bienvenue sur votre compte {employee.firstname}</h2>

          <div className="dashboard_nav">
            <FontAwesomeIcon icon={faEuroSign} size="lg" />
            <Link to={`/employes/ventes`}>
              <p className="dashboard_tabs dt1">Ventes</p>
            </Link>

            <FontAwesomeIcon icon={faWarehouse} />
            <Link to={`/employes/stock`}>
              <p className="dashboard_tabs dt2">Stocks</p>
            </Link>

            <FontAwesomeIcon icon={faMessage} />
            <Link to={`/employes/messages`}>
              <p className="dashboard_tabs dt3">Messages</p>
            </Link>

            <FontAwesomeIcon icon={faIdBadge} />
            <Link to={`/employes/${employee.id}`}>
              <p className="dashboard_tabs dt4">Infos personnelles</p>
            </Link>

            <div className={employee.role === 1 ? "" : "hidden"}>
              <FontAwesomeIcon icon={faBarsProgress} className='fontawesomeYellow' />
              <Link to={`/employes/gestion-comptes`}>
                <p className="dashboard_tabs dtAdmin">Gérer les profils</p>
              </Link>
            </div>

          </div>
        </React.Fragment>
      ))}



    </>
  )
};

export default Desk;