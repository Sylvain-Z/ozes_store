import {/*  Link , useNavigate , useParams ,  useLocation*/ } from 'react-router-dom';
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../Containers/Loading";
import PreviousPage from './Components/previousPage';

function EmployeesInfo() {
  
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
                  
                  <PreviousPage employee={employee}/>

                  <section className="form_section">

                    <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
                    <h3 className="form_title read">Vos informations personnelles</h3>
                  
                     <form>
                     <input
                            placeholder="Prénom"
                            type="text"
                            name="firstname"
                            value={employee.firstname}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Nom"
                            type="text"
                            name="lastname"
                            value={employee.lastname}
                            disabled="disabled"
                      />
                     <input
                            placeholder="Numéro de la rue"
                            type="text"
                            name="number"
                            value={employee.number}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Nom de la rue"
                            type="text"
                            name="street"
                            value={employee.street}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Complément d'adresse"
                            type="text"
                            name="complement"
                            value={employee.complement}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Code postale"
                            type="text"
                            name="postalcode"
                            value={employee.postal_code}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Ville"
                            type="text"
                            name="city"
                            value={employee.city}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Votre numéro de téléphone"
                            type="tel"
                            name="phone"
                            value={employee.phone}
                            disabled="disabled"
                      />
                      <input
                            placeholder="Email"
                            type="hidden"
                            name="email"
                            value={employee.email}
                            disabled="disabled"
                      />
                      
                      
                      <button type="button" onClick={() => window.location.href =`/employes/update/${employee.id}`}>Modifier mes informations</button>
                    </form>
                  </section>
                  </>
                ))}
    </>
  )
}

export default EmployeesInfo;