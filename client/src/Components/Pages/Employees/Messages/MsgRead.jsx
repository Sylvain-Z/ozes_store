import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns-tz';

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import PreviousPage from '../Components/previousPage';

function MsgRead() {

    const [messages, setMessages] = useState("");

    useEffect(() => {
        async function getMessagesRead() {
            try {
                const TOKEN_EMPL = getItemWithExpiration('authe');
                const messages = await fetch(FETCH_URL + "messages/all", {   // affiche tous les messages en BDD
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                      },
                });
                if (messages.status === 200) {
                    const json = await messages.json();
                    setMessages(json);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getMessagesRead();
    }, [messages]);

    return (
        <>

            <PreviousPage />

            <article className="display_messages">
                <h3 className="display_messages_title">Les messages clients</h3>
                {!messages ? (
                    <p>Il n'y a aucun message dans le fil</p>
                ) : (messages.map(message =>
                    <React.Fragment key={message.id}>

                        
                        <div className={message.user_pseudo === "Invité" ? "user_message guest_message" : "user_message"}>
                            <h4>Message du client</h4>
                            <h4>{message.subject}</h4>
                            <p className={message.status === "en attente" ? "message_status_yellow" : "message_status_green"}>{message.status}</p>
                            <p className="message_mail">Mail : {message.user_email}</p>
                            <p className="message_pseudo">Pseudo : {message.user_pseudo}</p>
                            <p className="message_content">{message.content}</p>
                            <p className="message_date">{format(new Date(message.publication_date), 'dd-MM-yyyy HH:mm', { timeZone: 'auto' })}</p>

                            {message.user_pseudo === "Invité" ? (
                                <p className={message.status === "en attente" ? "input_link_btn" : "hidden"}>Répondre par mail</p>
                            ) : (
                                <p className={message.status === "en attente" ? "input_link_btn" : "hidden"}><Link to={`/employes/messages/repondre/${message.id}`} >Répondre</Link></p>
                            )
                            }
                        </div>
                        <div className={message.status === "en attente" ? "hidden" : "employees_message"}>
                            <h4>Réponse du service</h4>
                            <h4>{message.subject}</h4>
                            <p className="message_content">{message.answer}</p>
                            <p className="message_date">{format(new Date(message.answer_date), 'dd-MM-yyyy HH:mm', { timeZone: 'auto' })}</p>
                        </div>

                    </React.Fragment >
                ))}
            </article>



        </>
    )
};

export default MsgRead;