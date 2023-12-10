import { Link , useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

import Loading from "../../Containers/Loading/Index";

function EmployeesInfoUpdate() {
  
  const navigate = useNavigate();

  const [employees, setEmployees]       = useState(null);  // stockent les informations de l'utilisateur et les injecte dans le formulaire
  const [firstname, setFirstname]       = useState("");
  const [lastname, setLastname]         = useState("");
  const [number, setNumber]             = useState("");
  const [street, setStreet]             = useState("");
  const [complement, setComplement]     = useState("");
  const [postal_code, setPostal_code]   = useState("");
  const [city, setCity]                 = useState("");
  const [phone, setPhone]               = useState("");
  const [email, setEmail]               = useState("");
  const [msg, setMsg]                   = useState(null);
    
  const myemployeeid = localStorage.getItem("myemployeeid");

  useEffect(() => {
    async function getData() {
        try {
            const employees = await fetch("/api/v1/employees/"+ myemployeeid);

            if (employees.status === 200) {
                const json = await employees.json();
                
                setEmployees(json);
                
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
    getData();
    }, []);


  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/v1/employees/update/${myemployeeid}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, number, street, complement, postal_code, city, phone, email }),
    });
    const json = await res.json();
    setMsg(json.msg);
    if (res.status === 201) {
      setTimeout(()=>{ navigate(`/employes/${employees[0].id}`)}, 2000)
    }
}

  return (
    <>
          {!employees ? (
                      <Loading/>
                  ) : ( employees.map( employee =>

                    <>
                      <p className="previous_page"><Link to={`/employes/${employee.id}`}>Retour</Link></p>

                      <section className="form_section">
    
                        <FontAwesomeIcon icon={faIdBadge} size="lg" className="fontawesomeYellow" />
                        <h3 className="form_title update">Modification de vos informations personnelles</h3>

                        <form onSubmit={handleSubmit}>

                          <label for="firstname">Votre prénom</label>
                          <input
                            placeholder="Votre prénom"
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}                          
                          />
                          <label for="lastname">Votre nom</label>
                          <input
                            placeholder="Votre nom"
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                          <label for="number">Numéro de la rue</label>
                          <input
                            placeholder="Numéro de la rue"
                            type="text"
                            name="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}                          
                          />
                          <label for="street">Nom de la rue</label>
                          <input
                            placeholder="Nom de la rue"
                            type="text"
                            name="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                          />
                          <label for="complement">Complément d'adresse</label>
                          <input
                            placeholder="Complément d'adresse"
                            type="text"
                            name="complement"
                            value={complement}
                            onChange={(e) => setComplement(e.target.value)}
                          />
                          <label for="postal_code">Code postal</label>
                          <input
                            placeholder="Code postal"
                            type="text"
                            name="postal_code"
                            value={postal_code}
                            onChange={(e) => setPostal_code(e.target.value.replace(/[^0-9]/g, ''))}
                          />
                          <label for="city">Ville</label>
                          <input
                            placeholder="Ville"
                            type="text"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                          <label for="city">Numéro de téléphone</label>
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
                         
                          <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                          <button type="button" onClick={() => window.location.href =`/employes/${employee.id}`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

                        </form>
                      </section>
                    </>
                  ))}
    </>
  )
}

export default EmployeesInfoUpdate;