import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FETCH_URL } from '../../../assets/const';
import { getItemWithExpiration } from '../../../assets/functions';

import Loading from "../Containers/Loading/Index";

function Desk() {

  const [employee, setEmployee] = useState(null);
  const TOKEN_EMPL = getItemWithExpiration('authe');
  const myemployeeid = getItemWithExpiration("myemployeeid");

  useEffect(() => {
    async function getEmplDesk() {
      try {
        let id = "";
        if (!myemployeeid) {
          return
        } else {
          id = myemployeeid;
        }
        const employee = await fetch(FETCH_URL + "employees/" + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${TOKEN_EMPL}`,
          },
        });

        if (employee.status === 200) {
          const json = await employee.json();
          setEmployee(json);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getEmplDesk();
  }, []);

  return (
    <>
      {!employee ? (
        <Loading />
      ) : (
        <>

          <h2>Bienvenue sur votre compte {employee[0].firstname}</h2>

          <div className="dashboard_nav">

            <Link to={`/employes/ventes`}>
              <div className="dashboard_div sales-div">
              <p className="dashboard_tabs sales-tabs">Ventes</p>
              </div>
            </Link>

            <Link to={`/employes/stock`}>
              <div className="dashboard_div stock-div">
              <p className="dashboard_tabs stock-tabs">Stocks</p>
              </div>
            </Link>

            <Link to={`/employes/messages`}>
              <div className="dashboard_div messages-div">
              <p className="dashboard_tabs messages-tabs">SAV</p>
              </div>
            </Link>

            <Link to={`/employes/${employee[0].id}`}>
              <div className="dashboard_div infosEmpl-div">
              <p className="dashboard_tabs infosEmpl-tabs">Infos personnelles</p>
              </div>
            </Link>

            <div className={employee[0].role === 1 ? "" : "hidden"}>
              <Link to={`/employes/gestion-comptes`}>
                <div className="dashboard_div management-div">
                <p className="dashboard_tabs management-tabs">Gérer les profils</p>
                </div>
              </Link>
            </div>

          </div>
        </>
      )}
    </>
  )
};

export default Desk;