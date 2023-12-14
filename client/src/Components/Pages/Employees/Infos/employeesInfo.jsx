import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import React from 'react';

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/previousPage';

function EmployeesInfo() {

      const [employees, setEmployees] = useState(null);  // stocke les informations de l'utilisateur et les injecte dans le formulaire
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

                              <PreviousPage />

                              <section className="form_section" >

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

                                          <p className='input_link_btn'><Link to={`/employes/actualiser-mes-infos/${employee.id}`}>Modifier mes informations</Link></p>
                                    </form>
                              </section>
                        </React.Fragment>
                  ))}
            </>
      )
}

export default EmployeesInfo;