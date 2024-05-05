import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function Profil() {

  const params = useParams();
  const [employee, setEmployee] = useState(null); // affiche les informations d'un profil spécifique

  useEffect(() => {
    async function getEmplProfil() {
      try {
        const TOKEN_EMPL = getItemWithExpiration('authe');
        const employee = await fetch(FETCH_URL + "employees/employeeBy/" + params.id, {
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
    getEmplProfil();
  }, []);

  return (
    <>

      <p className="previous_page"><Link to={`/employes/gestion-comptes`}>Retour</Link></p>

      {!employee ? (
        <Loading />
      ) : (

        <>
          <section className="form_section">

            <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title read">Information du collaborateur</h3>

            <form>
              <label htmlFor="firstname">Prénom</label>
              <input
                placeholder="Prénom"
                type="text"
                name="firstname"
                value={employee[0].firstname}
                disabled="disabled"
              />
              <label htmlFor="lastname">Nom</label>
              <input
                placeholder="Nom"
                type="text"
                name="lastname"
                value={employee[0].lastname}
                disabled="disabled"
              />
              <label htmlFor="lastname">Email *</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={employee[0].email}
                disabled="disabled"
              />
              <label htmlFor="role">Role (1 : Admin, 2 : Modérateur) *</label>
              <input
                placeholder="Role (1 : Admin, 2 : Modérateur)"
                type="text"
                name="role"
                value={employee[0].role}
                disabled="disabled"
              />
              <label htmlFor="number">Numéro de la rue *</label>
              <input
                placeholder="Numéro de la rue"
                type="text"
                name="number"
                value={employee[0].number}
                disabled="disabled"
              />
              <label htmlFor="street">Nom de la rue *</label>
              <input
                placeholder="Nom de la rue"
                type="text"
                name="street"
                value={employee[0].street}
                disabled="disabled"
              />
              <label htmlFor="complement">Complément d'adresse</label>
              <input
                placeholder="Complément d'adresse"
                type="text"
                name="complement"
                value={employee[0].complement}
                disabled="disabled"
              />
              <label htmlFor="postal_code">Code postal  *</label>
              <input
                placeholder="Code postale"
                type="text"
                name="postalcode"
                value={employee[0].postal_code}
                disabled="disabled"
              />
              <label htmlFor="city">Ville *</label>
              <input
                placeholder="Ville"
                type="text"
                name="city"
                value={employee[0].city}
                disabled="disabled"
              />
              <label htmlFor="phone">Numéro de téléphone</label>
              <input
                placeholder="Votre numéro de téléphone"
                type="tel"
                name="phone"
                value={employee[0].phone}
                disabled="disabled"
              />

              <p className='input_link_btn'><Link to={`/employes/gestion-comptes/actualiser/${employee[0].id}`}>Modifier</Link></p>

            </form>
          </section>
        </>
      )}
    </>
  )
}

export default Profil;