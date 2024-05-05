import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function MsgAnswer() {

    const params = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);

    const [answer, setAnswer] = useState("");
    const [id, setId] = useState(""); // le champ du formulaire n'est pas nécessaire, cependant la state pour le "body: JSON.stringify({ answer , id })"" est obligatoire
    const [msg, setMsg] = useState("");

    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getMessagesAnswer() {
            try {
                const message = await fetch(FETCH_URL + "messages/employees-read/" + params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                    },
                }); // récupère le message par rapport au messages.id

                if (message.status === 200) {
                    const json = await message.json();
                    setMessage(json);
                    setAnswer(json[0].answer)
                    setId(json[0].id)
                }

            } catch (error) {
                throw Error(error);
            }
        }
        getMessagesAnswer();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "messages/answer/" + params.id, { // envoie la réponse au message par rapport au messages.id
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
            },
            body: JSON.stringify({ answer, id }),
        });
        const json = await res.json();
        setMsg(json.msg);

        if (res.status === 201) {
            navigate("/employes/messages")
        }
    };


    return (
        <>
            <article className="display_messages">
                <h3 className="display_messages_title">Répondre au message</h3>
                {!message ? (
                    <p>Le message n'est pas disponible</p>
                ) : (
                    <>
                        <div className="employees_message">
                            <p className={message[0].status === "en attente" ? "message_status_yellow" : "message_status_green"}>{message.status}</p>
                            <p>{message[0].user_email}</p>
                            <p>{message[0].user_pseudo}</p>
                            <p>{message[0].content}</p>

                            <form onSubmit={handleSubmit}>

                                {msg && <p className="msg_green">{msg}</p>}

                                <textarea className="form_input textarea"
                                    required
                                    placeholder="Répondre"
                                    type="text"
                                    name="answer"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />

                                <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                                <p className="button_retour_rouge"><Link to={`/employes/messages`}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed " /></Link></p>

                            </form>
                        </div>

                    </>
                )}
            </article>



        </>
    )
};

export default MsgAnswer;