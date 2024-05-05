import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faCircleCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function UpdateProfil() {

    const params = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [number, setNumber] = useState("");
    const [street, setStreet] = useState("");
    const [complement, setComplement] = useState("");
    const [postal_code, setPostal_code] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setID] = useState("");
    const [msg, setMsg] = useState("");

    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getEmplProfilUpdate() {
            try {
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

                    setFirstname(json[0].firstname);
                    setLastname(json[0].lastname);
                    setEmail(json[0].email);
                    setRole(json[0].role);
                    setNumber(json[0].number);
                    setStreet(json[0].street);
                    setComplement(json[0].complement);
                    setPostal_code(json[0].postal_code);
                    setCity(json[0].city);
                    setPhone(json[0].phone);
                    setID(json[0].id);
                }

            } catch (error) {
                throw Error(error);
            }
        }
        getEmplProfilUpdate();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "employees/update-employee/" + params.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
            body: JSON.stringify({ firstname, lastname, email, role, number, street, complement, postal_code, city, phone, id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        if (res.status === 201) {
            navigate(`/employes/gestion-comptes/` + params.id)
        }
    }

    return (
        <>

            <p className="previous_page"><Link to={`/employes/gestion-comptes/` + params.id}>Retour</Link></p>

            {!employee ? (
                <Loading />
            ) : (
                <>
                    <section className="form_section">

                        <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
                        <h3 className="form_title update">Modifier les information du collaborateur</h3>

                        {msg && <p className="msg_green">{msg}</p>}

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
                            <label htmlFor="lastname">Email *</label>
                            <input
                                required
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="role">Role (1 : Admin, 2 : Modérateur) *</label>
                            <input
                                required
                                placeholder="Role (1 : Admin, 2 : Modérateur)"
                                type="text"
                                name="role"
                                value={role}
                                maxLength="1"
                                onChange={(e) => setRole(e.target.value.replace(/[^0-9]/g, ''))}
                            />
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
                            <label htmlFor="postal_code">Code postal  *</label>
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
                            <label htmlFor="phone">Numéro de téléphone</label>
                            <input
                                placeholder="Numéro de téléphone sans espaces"
                                type="tel"
                                name="phone"
                                value={phone}
                                pattern="\+\d{11}"
                                onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
                            />


                            {msg && <p className="msg_green">{msg}</p>}

                            <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                            <Link to={`/employes/gestion-comptes/${employee[0].id}`} className="button_retour_rouge"><p ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></p></Link>

                        </form>
                    </section>
                </>
            )}
        </>
    )
}

export default UpdateProfil;