import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./form.module.css";
import { signin } from "../../../../../store/slices/user";



function Form({ type }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [lastname, setLastname]       = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);


    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/users/sign" + type, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lastname, email, password }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);

        if(type === "in" && res.status === 200){
            localStorage.setItem("auth", json.TOKEN);
            const cart = JSON.parse(localStorage.getItem("cart"));
            dispatch(signin({email}));
            navigate("/");
        }
        
        if (type === "up" && res.status === 201) {
            navigate("/utilisateur/creer-un-compte");
        }
    }

    return (
        <>

            {type === "in" ? (
                <h2>Connectez vous à votre compte</h2>
            ) : ( 
                <h2>Créez votre compte</h2>
            )}

            {msg && <p className={styles.msg}>{msg}</p>}
            {msg2 && <p className={styles.msg}><Link to="/utilisateurs/connexion">{msg2}</Link></p>}
            
            <form onSubmit={handleSubmit}>
                {type === "up" && (
                <input
                    placeholder="Votre nom de famille"
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                )}
                <input
                    placeholder="votre email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Votre mot de passe"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    {type === "in" ? "Se connecter" : "S'enregistrer"}
                </button>
            </form>
            {type === "in" && (
                <p>
                    Pas encore de compte ?{" "}
                    Vous pouvez <Link to="/utilisateurs/creer-un-compte">en créer un.</Link>
                </p>
            )}
        </>
    );
}

export default Form;
