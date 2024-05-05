import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import React from 'react';

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function DeliveryUpdate() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [pseudo, setPseudo] = useState(""); // le champ du formulaire n'est pas nécessaire, cependant la state pour le "body: JSON.stringify({ firstname, lastname, number, street, complement, postal_code, city, phone, pseudo })"" est obligatoire

  const [id, setId] = useState("");
  const [msg, setMsg] = useState(null);

  const TOKEN = getItemWithExpiration('auth');
  const myuserid = getItemWithExpiration("myuserid");

  useEffect(() => {
    async function getUserDeliveryUpdate() {
      try {
        let id = "";
        if (!myuserid) {
          return
        } else {
          id = myuserid;
        }
        const user = await fetch(FETCH_URL + "users/" + id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `Bearer ${TOKEN}`,
          }
        });

        if (user.status === 200) {
          const json = await user.json();

          setUser(json);

          setFirstname(json[0].firstname);
          setLastname(json[0].lastname);
          setNumber(json[0].number);
          setStreet(json[0].street);
          setComplement(json[0].complement);
          setPostal_code(json[0].postal_code);
          setCity(json[0].city);
          setPhone(json[0].phone);
          setPseudo(json[0].pseudo);
          setId(json[0].id);

        }
      } catch (error) {
        throw Error(error);
      }
    }
    getUserDeliveryUpdate();
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(FETCH_URL + "users/infos-livraison-update/" + myuserid, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ firstname, lastname, number, street, complement, postal_code, city, phone, pseudo }),
    });
    const json = await res.json();
    setMsg(json.msg);
    if (res.status === 201) {
      navigate(`/utilisateurs/infos-livraison/${id}`);
    }
  }

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <>
          <p className="previous_page"><Link to={`/utilisateurs/infos-livraison/${user[0].id}`}>Retour</Link></p>

          <section className="form_section">

            <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeYellow" />
            <h3 className="form_title update">Modification de vos informations de livraison</h3>

            <form onSubmit={handleSubmit}>

              <label htmlFor="firstname">Prénom *</label>
              <input
                required
                placeholder="Votre prénom"
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label htmlFor="lastname">Nom *</label>
              <input
                required
                placeholder="Votre nom"
                type="text"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />

              <p className="form_subtitle read">Votre Adresse</p>

              <label htmlFor="number">Numéro de la rue *</label>
              <input
                required
                placeholder="Numéro de la rue"
                type="text"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <label htmlFor="street">Nom de la rue *</label>
              <input
                required
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
              <label htmlFor="postal_code">Code postal *</label>
              <input
                required
                placeholder="Code postal"
                type="text"
                name="postal_code"
                value={postal_code}
                onChange={(e) => setPostal_code(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <label htmlFor="city">Ville *</label>
              <input
                required
                placeholder="Ville"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label htmlFor="city">Numéro de téléphone sans espaces</label>
              <input
                placeholder="Votre numéro de téléphone (non obligatoire)"
                type="tel"
                name="phone"
                value={phone}
                pattern="\+\d{11}"
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
              />
              {/* <label htmlFor="pseudo">Votre pseudo</label> */}
              <input
                placeholder="Votre pseudo"
                type="hidden"
                name="pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />

              {msg && <p className="msg_green">{msg}</p>}

              <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
              <p className="button_retour_rouge"><Link to={`/utilisateurs/infos-livraison/${user[0].id}`} ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></Link></p>

            </form>
          </section>
        </>
      )}
    </>
  )
}

export default DeliveryUpdate;