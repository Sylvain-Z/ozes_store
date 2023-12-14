import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import React from 'react';

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function Profil() {

  const params = useParams();
  const [employees, setEmployees] = useState(null); // affiche les information d'un profil spécifique

  useEffect(() => {
    async function getData() {
      try {
        const employees = await fetch(FETCH_URL + "employees/employeeBy/" + params.id);
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

      <p className="previous_page"><Link to={`/employes/gestion-comptes`}>Retour</Link></p>

      {!employees ? (
        <Loading />
      ) : (employees.map(employee =>

        <React.Fragment key={employee.id}>
          <section className="form_section">

            <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title read">Information du collaborateur</h3>

            <form>
              <label htmlFor="firstname">Prénom</label>
              <input
                placeholder="Prénom"
                type="text"
                name="firstname"
                value={employee.firstname}
                disabled="disabled"
              />
              <label htmlFor="lastname">Nom</label>
              <input
                placeholder="Nom"
                type="text"
                name="lastname"
                value={employee.lastname}
                disabled="disabled"
              />
              <label htmlFor="lastname">Email *</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={employee.email}
                disabled="disabled"
              />
              <label htmlFor="role">Role (1 : Admin, 2 : Modérateur) *</label>
              <input
                placeholder="Role (1 : Admin, 2 : Modérateur)"
                type="text"
                name="role"
                value={employee.role}
                disabled="disabled"
              />
              <label htmlFor="number">Numéro de la rue *</label>
              <input
                placeholder="Numéro de la rue"
                type="text"
                name="number"
                value={employee.number}
                disabled="disabled"
              />
              <label htmlFor="street">Nom de la rue *</label>
              <input
                placeholder="Nom de la rue"
                type="text"
                name="street"
                value={employee.street}
                disabled="disabled"
              />
              <label htmlFor="complement">Complément d'adresse</label>
              <input
                placeholder="Complément d'adresse"
                type="text"
                name="complement"
                value={employee.complement}
                disabled="disabled"
              />
              <label htmlFor="postal_code">Code postal  *</label>
              <input
                placeholder="Code postale"
                type="text"
                name="postalcode"
                value={employee.postal_code}
                disabled="disabled"
              />
              <label htmlFor="city">Ville *</label>
              <input
                placeholder="Ville"
                type="text"
                name="city"
                value={employee.city}
                disabled="disabled"
              />
              <label htmlFor="phone">Numéro de téléphone</label>
              <input
                placeholder="Votre numéro de téléphone"
                type="tel"
                name="phone"
                value={employee.phone}
                disabled="disabled"
              />

              <p className='input_link_btn'><Link to={`/employes/gestion-comptes/actualiser/${employee.id}`}>Modifier les informations</Link></p>

            </form>
          </section>
        </React.Fragment>
      ))}
    </>
  )
}

export default Profil;