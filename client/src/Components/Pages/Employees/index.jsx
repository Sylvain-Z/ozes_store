import React from 'react'
// import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { Link , /* useNavigate */ } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge , faEuroSign , faMessage , faWarehouse , faCirclePlus , faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading/Index";

function Desk() {

  // const { info } = useSelector((state) => state.user);
  const [ employees, setEmployees ] = useState(null);
  const myemployeeid = localStorage.getItem("myemployeeid");

  useEffect(() => {
    async function getData() {
        try {
            let id="Invite"; 

            if(!myemployeeid){ 
                id="Invite"; 
            }else{ 
            id=myemployeeid; 
            } 

            const employees = await fetch("/api/v1/employees/"+ id);
        
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
                    <Loading/>
                ) : ( employees.map( employee =>
                    <>

                      <h2>Bienvenue sur votre compte {employee.firstname}</h2>

                        <div className="dashboard_nav">
                          <FontAwesomeIcon icon={faEuroSign} size="lg"/> 
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
                            <FontAwesomeIcon icon={faCirclePlus} className='fontawesomeYellow'/>
                            <Link to={`/employes/gestion-comptes`}>
                              <p className="dashboard_tabs dtAdmin">Gérer les profils</p>
                            </Link>
                          </div>

                        </div>
                    </>
                    ))}

      
    
    </>
  )
};

export default Desk;