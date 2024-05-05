import React from 'react';
import { format } from 'date-fns-tz';

function ReadMessages({ messages }) {

    return (
        <>
            <article className="display_messages">
                <h3 className="display_messages_title">Vos messages envoyés</h3>
                {!messages ? (
                    <p>Vous n'avez pas envoyé de message</p>
                ) : (messages.map(message =>

                    <React.Fragment key={message.id}>

                        <div className="user_message">
                            <p className={message.status === "en attente" ? "message_status_yellow" : "message_status_green"}>{message.status}</p>
                            <h4>Votre message</h4>
                            <h4>{message.subject}</h4>
                            <p className="message_content">{message.content}</p>
                            <p className="message_date">Le : {format(new Date(message.publication_date), 'dd-MM-yyyy HH:mm', { timeZone: 'auto' })}</p>
                        </div>
                        <div className={message.status === "en attente" ? "hidden" : "employees_message user_answer"}>
                            <h4>Réponse du service client</h4>
                            <h4>{message.subject}</h4>
                            <p className="message_content">{message.answer}</p>
                            <p className="message_date">{format(new Date(message.answer_date), 'dd-MM-yyyy HH:mm', { timeZone: 'auto' })}</p>
                        </div>
                        
                    </React.Fragment>
                ))}
            </article>
        </>
    )
}

export default ReadMessages;