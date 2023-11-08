import React from 'react'
// import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { Link , /* useNavigate */ } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge , faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";

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
                            <p className="dashboard_titles dt1">Ventes</p>
                          </Link>

                          <FontAwesomeIcon icon={faWarehouse} />
                          <Link to={`/employes/stock`}>
                            <p className="dashboard_titles dt2">Stocks</p>
                          </Link>

                          <FontAwesomeIcon icon={faIdBadge} />
                          <Link to={`/employes/${employee.id}`}>
                            <p className="dashboard_titles dt3">Infos personnelles</p>
                          </Link>

                          
                        </div>
                    </>
                    ))}

      
    
    </>
  )
};

export default Desk;