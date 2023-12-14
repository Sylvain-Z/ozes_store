import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function DeleteUser() {

    const navigate = useNavigate();
    const params = useParams();

    const myuserid = localStorage.getItem("myuserid");
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);  // pour submit delete

    useEffect(() => {
        async function getData() {
            try {
                let id = "";
                if (!myuserid) {
                    return
                } else {
                    id = myuserid;
                }
                const user = await fetch(FETCH_URL + "users/" + id);
                if (user.status === 200) {
                    const json = await user.json();
                    setUser(json);
                    setId(json[0].id);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);


    const [pseudo, setPseudo] = useState("");
    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "users/delete/" + params.id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
                localStorage.removeItem("auth");
                localStorage.removeItem("myuserid");
                navigate(`/le_store`);
        }
    }

    return (
        <>
            <section className="form_section">

                <h3 className="form_title update">Suppression de votre compte</h3>

                <p className="msg_red">Êtes-vous sûr ? Cette action est irréversible</p>

                <form onSubmit={handleSubmit}>

                    {!user ? (
                        <>
                            <p>Profil non trouvé</p>
                            <button type="button" onClick={() => window.location.href = `/le-store`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>
                        </>
                    ) : (
                        <>
                            <figure className="delete_fig">
                                <img src={require("../../../../assets/img/user_out.png")} alt="pictograme buste" />
                                <figcaption>
                                    <p>{user[0].firstname} {user[0].lastname}</p>
                                </figcaption>
                            </figure>

                            {msg && <p className="msg_green">{msg}</p>}

                            <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                            <button type="button" onClick={() => window.location.href = `/utilisateurs/infos-connexion/${user[0].id}`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>
                        </>
                    )}
                </form>

            </section>


        </>
    )
};


export default DeleteUser;