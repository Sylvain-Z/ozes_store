import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signin } from "../../../../store/slices/employees";

function Form({ type }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstname, setFirstname]       = useState("");
    const [lastname, setLastname]       = useState("");
    const [role, setRole]       = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);
    const [msg3, setMsg3] = useState(null);


    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/employees/sign" + type, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstname, lastname, role, email, password }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
        setMsg3(json.msg3);

        if(type === "in" && res.status === 200){
            localStorage.setItem("authe", json.TOKEN);
            localStorage.setItem("myemployeeid", email);
            dispatch(signin({email}));
            navigate("/employes");
        }
        
        if (type === "up" && res.status === 201) {
            navigate("/employes/creer-un-compte");
        }
    }

    return (
        <>
            <section className="form_section">
                {type === "in" ? (
                    <h2 className="form_title">Connectez vous à votre compte</h2>
                ) : ( 
                    <h2 className="form_title">Créez le compte de votre collaborateur</h2>
                )}

                {msg && <p className="msg_red">{msg}</p>}
                {msg2 && <p className="msg_green"><Link to="/employees/connexion">{msg2}</Link></p>}
                {msg3 && <p className="msg_yellow"><Link to="/employees/connexion">{msg3}</Link></p>}
                
                <form onSubmit={handleSubmit}>
                    {type === "up" && (
                        <>
                            <input
                                placeholder="Prénom"
                                type="text"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <input
                                placeholder="Nom de famille"
                                type="text"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <input
                                placeholder="Role (1 : Admin, 2 : Modérateur)"
                                type="text"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </>
                    )}
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Mot de passe"
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
                    <>
                        <p className="signin_to_up">
                            Pas encore de compte ?</p>
                        <p className="signin_to_up">
                            Vous pouvez <Link to="/employes/creer-un-compte">en créer un.</Link></p>
                    </>
                )}
                {type === "up" && (
                    <>
                        <p className="signin_to_up">
                            Vous avez déjà un compte ?</p>
                        <p className="signin_to_up">
                            Connectez vous <Link to="/employes/connexion">ici.</Link></p>
                    </>
                )}

            </section>
        </>
    );
}

export default Form;
