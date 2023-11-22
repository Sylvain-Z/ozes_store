// import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signin } from "../../../../store/slices/user";

function Form({ type }) {

    // const { info } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pseudo, setPseudo]     = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    
    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);
    const [msg3, setMsg3] = useState(null);


    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/users/sign" + type, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pseudo, password }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
        setMsg3(json.msg3);

        if(type === "in" && res.status === 200){
            localStorage.setItem("auth", json.TOKEN);
            localStorage.setItem("myuserid", pseudo);
            // const cart = JSON.parse(localStorage.getItem("cart"));
            dispatch(signin({email}));
            navigate("/");
        }
        
        if (type === "up" && res.status === 201) {
            navigate("/utilisateurs/creer-un-compte");
        }
    }

    return (
        <>
            <section className="form_section">

                {type === "in" ? (
                    <>
                    <h2 className="form_title">Connectez vous<br/>à votre compte</h2>

                    {msg && <p className="msg_red">{msg}</p>}
                    </>
                ) : ( 
                    <>
                    <h2 className="form_title">Créez votre compte</h2>

                    {msg && <p className="msg_red">{msg}</p>}
                    {msg2 && <p className="msg_green">{msg2}</p>}
                    {msg3 && <p className="msg_yellow"><Link to="/utilisateurs/connexion" className="msg_yellow">{msg3}</Link></p>}
                    </>
                )}
                
                <form onSubmit={handleSubmit}>
                    
                    <input
                        placeholder="Votre pseudo"
                        type="text"
                        name="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                    {type === "up" && (
                    <input
                        placeholder="Votre email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    )}
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
                    <>
                        <p className="signin_to_up">
                            Pas encore de compte ?</p>
                        <p className="signin_to_up">
                            Vous pouvez <Link to="/utilisateurs/creer-un-compte">en créer un.</Link></p>
                    </>
                )}
                {type === "up" && (
                    <>
                        <p className="signin_to_up">
                            Vous avez déjà un compte ?</p>
                        <p className="signin_to_up">
                            Connectez vous <Link to="/utilisateurs/connexion">ici.</Link></p>
                    </>
                )}

            </section>
        </>
    );
}

export default Form;
