import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

function AddProfil() {

    const navigate = useNavigate();

    const [id, setId] = useState(uuidv4().slice(0, 16)); // à chaque chargement du composant une chaine de 16 caractères aléatoire sera stocké

    const [firstname, setFirstname] = useState(""); // les states permettent de gérer le formulaire et son remplissage même s'il est vide
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const TOKEN_EMPL = getItemWithExpiration('authe');
        const res = await fetch(FETCH_URL + "employees/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
            body: JSON.stringify({ id, firstname, lastname, role, email, password }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);

        if (res.status === 201) {
            navigate("/employes/gestion-comptes")
        }
    }

    return (
        <>

            <p className="previous_page"><Link to={`/employes/gestion-comptes`}>Retour</Link></p>

            <section className="form_section">

                <h2 className="form_title">Créez le compte de votre collaborateur</h2>


                {msg && <p className="msg_red">{msg}</p>}
                {msg2 && <p className="msg_green">{msg2}</p>}

                <form onSubmit={handleSubmit}>

                    <input
                        placeholder="ID"
                        type="hidden"
                        name="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input
                        required
                        placeholder="Prénom"
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                        required
                        placeholder="Nom de famille"
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <input
                        required
                        placeholder="Role (1 : Admin, 2 : Modérateur)"
                        type="text"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value.replace(/[^0-9.]/g, ''))}
                    />
                    <input
                        required
                        placeholder="Email"
                        type="text"  // vérification du format de l'entrée de l'utilisateur côté server
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required
                        placeholder="Mot de passe"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Créer le compte</button>
                </form>

            </section>
        </>
    );
}

export default AddProfil;
