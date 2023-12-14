import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Resume from './Resume';

function CartDeliveryInfos() {

    const myuserid = localStorage.getItem("myuserid");
    const [users, setUsers] = useState(null);

    const [firstname, setFirstname] = useState(""); // les states servent à remplir le formulaire
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [street, setStreet] = useState("");
    const [complement, setComplement] = useState("");
    const [postal_code, setPostal_code] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        async function getData() { // récupère les informations de livraison de l'usager qui est connecté à son compte
            try {
                let id = "";
                if (!myuserid) {
                    return
                } else {
                    id = myuserid;
                }
                const users = await fetch(FETCH_URL + "users/" + id);

                if (users.status === 200) {
                    const json = await users.json();
                    setUsers(json);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);

    // Renseigner les informations de livraison d'un usager non connecté à un compte

    const userInfos = localStorage.getItem("userInfos");
    const [userLS, setUserLS] = useState([]);

    useEffect(() => { // récupère les infos et les stockent dans la state si elles existent
        if (userInfos) {
            let userInfosLS = userInfos;
            const userInfosArr = JSON.parse(userInfosLS);
            if (userInfosArr) {
                setUserLS(userInfosArr);
            }
        }
    }, []);

    async function handleSubmitInfos(e) {  // si l'usager n'a pas de compte il renseignera ses informations de livraison dans le localstorage
        e.preventDefault();
        localStorage.setItem("userInfos", JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            number: number,
            street: street,
            complement: complement,
            postal_code: postal_code,
            city: city,
            phone: phone,
        }));
        window.location.reload();
    }

    async function eraseUserLS(e) {  // supprime "userInfos" du LS
        e.preventDefault();
        if (userInfos) {
            localStorage.removeItem("userInfos");
            window.location.reload();
        }
    }

    return (
        <>
            <Link to="/panier"><p className="previous_page">Retour au panier</p></Link>

            <div className="display_cart">
                {!users ? (
                    <>

                        {!userInfos ? (
                            <>
                                <article className='address'>
                                    <h3>Ajoutez vos informations de livraison</h3>

                                    <form onSubmit={handleSubmitInfos} className='addressForm'>

                                        <label for="firstname">Prénom *</label>
                                        <input
                                            required
                                            placeholder="Votre prénom"
                                            type="text"
                                            name="firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                        <label for="lastname">Nom *</label>
                                        <input
                                            required
                                            placeholder="Votre nom"
                                            type="text"
                                            name="lastname"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                        <label for="email">Email *</label>
                                        <input
                                            required
                                            placeholder="Votre email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <p className='form_advise_black'>Votre email servira à vous informer de l'avancée de votre commande</p>
                                        <label for="number">Numéro de la rue *</label>
                                        <input
                                            required
                                            placeholder="Numéro de la rue"
                                            type="text"
                                            name="number"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
                                        />
                                        <label for="street">Nom de la rue *</label>
                                        <input
                                            required
                                            placeholder="Nom de la rue"
                                            type="text"
                                            name="street"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                        <label for="complement">Complément d'adresse *</label>
                                        <input
                                            required
                                            placeholder="Complément d'adresse"
                                            type="text"
                                            name="complement"
                                            value={complement}
                                            onChange={(e) => setComplement(e.target.value)}
                                        />
                                        <label for="postal_code">Code postal *</label>
                                        <input
                                            required
                                            placeholder="Code postal"
                                            type="text"
                                            name="postal_code"
                                            value={postal_code}
                                            onChange={(e) => setPostal_code(e.target.value.replace(/[^0-9]/g, ''))}
                                        />
                                        <label for="city">Ville *</label>
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
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <button type="submit">Valider</button>
                                    </form>

                                </article>

                            </>
                        ) : (
                            <>
                                <article className='address'>

                                    <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeBlue" />
                                    <h3 className="form_title read">Vos informations de livraison</h3>
                                    <p>{userLS.firstname} {userLS.lastname}</p>
                                    <p>{userLS.email}</p>
                                    <p>{userLS.number} {userLS.street}</p>
                                    <p>{userLS.complement}</p>
                                    <p>{userLS.postal_code}</p>
                                    <p>{userLS.city}</p>
                                    <p>{userLS.phone}</p>

                                    <button onClick={eraseUserLS}>Modifier</button>

                                </article>
                            </>
                        )}


                    </>

                ) : (users.map(user =>

                    <>
                        <article className='address' key={user.id}>

                            <FontAwesomeIcon icon={faTruckFast} size="lg" className="fontawesomeYellow" />
                            <h3 className="form_title read">Vos informations de livraison</h3>
                            <p>{user.firstname} {user.lastname}</p>
                            <p>{user.number} {user.street}</p>
                            <p>{user.complement}</p>
                            <p>{user.postal_code}</p>
                            <p>{user.city}</p>

                            <Link to={`/utilisateurs/infos-livraison-update/${user.id}`}><p className='modifyLink'>Modifier</p></Link>

                        </article>

                    </>
                ))}

                <Resume />
            </div>
        </>
    )
}

export default CartDeliveryInfos;