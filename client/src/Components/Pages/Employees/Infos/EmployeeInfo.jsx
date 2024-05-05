import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";
import PreviousPage from '../Components/previousPage';

function EmployeeInfo() {

      const [employee, setEmployee] = useState(null);  // stocke les informations de l'utilisateur et les injecte dans le formulaire
      const TOKEN_EMPL = getItemWithExpiration('authe');
      const myemployeeid = getItemWithExpiration("myemployeeid");

      useEffect(() => {
            async function getEmplInfos() {
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
            getEmplInfos();
      }, []);

      return (
            <>
                  {!employee ? (
                        <Loading />
                  ) : (
                        <>
                              <PreviousPage />

                              <section className="form_section" >

                                    <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
                                    <h3 className="form_title read">Vos informations personnelles</h3>

                                    <form>
                                          <input
                                                placeholder="Prénom"
                                                type="text"
                                                name="firstname"
                                                value={employee[0].firstname}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Nom"
                                                type="text"
                                                name="lastname"
                                                value={employee[0].lastname}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Numéro de la rue"
                                                type="text"
                                                name="number"
                                                value={employee[0].number}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Nom de la rue"
                                                type="text"
                                                name="street"
                                                value={employee[0].street}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Complément d'adresse"
                                                type="text"
                                                name="complement"
                                                value={employee[0].complement}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Code postale"
                                                type="text"
                                                name="postalcode"
                                                value={employee[0].postal_code}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Ville"
                                                type="text"
                                                name="city"
                                                value={employee[0].city}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Votre numéro de téléphone"
                                                type="tel"
                                                name="phone"
                                                value={employee[0].phone}
                                                disabled="disabled"
                                          />
                                          <input
                                                placeholder="Email"
                                                type="hidden"
                                                name="email"
                                                value={employee[0].email}
                                                disabled="disabled"
                                          />

                                          <p className='input_link_btn'><Link to={`/employes/actualiser-mes-infos/${employee[0].id}`}>Modifier</Link></p>
                                    </form>
                              </section>
                        </>
                  )}
            </>
      )
}

export default EmployeeInfo;