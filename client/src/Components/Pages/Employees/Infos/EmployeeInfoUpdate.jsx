import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import Loading from "../../Containers/Loading/Index";

function EmployeeInfoUpdate() {

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);  // stockent les informations de l'utilisateur et les injecte dans le formulaire
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const TOKEN_EMPL = getItemWithExpiration('authe');
  const myemployeeid = getItemWithExpiration("myemployeeid");

  useEffect(() => {
    async function getEmplInfosUpdate() {
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

          setFirstname(json[0].firstname);
          setLastname(json[0].lastname);
          setNumber(json[0].number);
          setStreet(json[0].street);
          setComplement(json[0].complement);
          setPostal_code(json[0].postal_code);
          setCity(json[0].city);
          setPhone(json[0].phone);
          setEmail(json[0].email);
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getEmplInfosUpdate();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(FETCH_URL + "employees/update/" + myemployeeid, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${TOKEN_EMPL}`,
      },
      body: JSON.stringify({ firstname, lastname, number, street, complement, postal_code, city, phone, email }),
    });
    const json = await res.json();
    setMsg(json.msg);
    if (res.status === 201) {
      navigate(`/employes/${employee[0].id}`)
    }
  }

  return (
    <>
      {!employee ? (
        <Loading />
      ) : (
        <>
          <p className="previous_page"><Link to={`/employes/${employee.id}`}>Retour</Link></p>

          <section className="form_section">

            <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title update">Modification de vos informations personnelles</h3>

            <form onSubmit={handleSubmit}>

              <label htmlFor="firstname">Votre prénom</label> {/* désactivé pour que le collaborateur ne s'amuse pas à changer son nom et prénom */}
              <input
                disabled
                placeholder="Votre prénom"
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label htmlFor="lastname">Votre nom</label> {/* désactivé pour que le collaborateur ne s'amuse pas à changer son nom et prénom */}
              <input
                disabled
                placeholder="Votre nom"
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label htmlFor="number">Numéro de la rue</label>
              <input
                placeholder="Numéro de la rue"
                type="text"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <label htmlFor="street">Nom de la rue</label>
              <input
                placeholder="Nom de la rue"
                type="text"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <label htmlFor="complement">Complément d'adresse</label>
              <input
                placeholder="Complément d'adresse"
                type="text"
                name="complement"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
              <label htmlFor="postal_code">Code postal</label>
              <input
                placeholder="Code postal"
                type="text"
                name="postal_code"
                value={postal_code}
                onChange={(e) => setPostal_code(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <label htmlFor="city">Ville</label>
              <input
                placeholder="Ville"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="city">Numéro de téléphone</label>
              <input
                placeholder="Votre numéro de téléphone (Non obligatoire)"
                type="tel"
                name="phone"
                value={phone}
                pattern="\+\d{11}"
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
              />
              <input
                placeholder="Email"
                type="hidden"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {msg && <p className="msg_green">{msg}</p>}

              <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
              <p className="button_retour_rouge"><Link to={`/employes/${employee[0].id}`} ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></Link></p>

            </form>
          </section>
        </>
      )}
    </>
  )
}

export default EmployeeInfoUpdate;