import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";

import PreviousPage from '../Components/previousPage';

function UserMsgRead () {

    const [ messages , setMessages ] = useState("");
    
    // const [ id , setId ] = useState("");  
    // const [ answer , setAnswer ] = useState("");
    // const [ msg , setMsg ] = useState("");

    useEffect(() => {
        async function getData() {
              try {
                    const messages = await fetch("/api/v1/messages/all");

                    if (messages.status === 200) {
                        const json = await messages.json();
                        setMessages(json);
                    }
                    
              } catch (error) {
              throw Error(error);
              }
        }
        getData();
        }, []);

    return (
        <>

        <PreviousPage/>

        <article className="display_messages">
                    <h3 className="display_messages_title">Les messages clients</h3>
                    {!messages ? (
                        <p>Il n'y a aucun message dans le fil</p>
                    ) : ( messages.map( message =>
                        <>
                        
                        <div className={message.status === "en attente" ? "hidden" : "employees_message"}>
                                <h4>Réponse du service</h4>
                                <h4>{message.subject}</h4>
                                <p className="message_content">{message.answer}</p>
                                <p className="message_date">{message.answer_date}</p>
                        </div>
                        <div className="user_message">
                                <h4>Message du client</h4>
                                <h4>{message.subject}</h4>
                                <p className={message.status === "en attente" ? "message_status_yellow" : "message_status_green"}>{message.status}</p>
                                <p>{message.user_email}</p>
                                <p>{message.pseudo}</p>
                                <p className="message_content">{message.content}</p>
                                <p className="message_date">{message.publication_date}</p>

                                
                                <Link to={`/employes/messages/repondre/${message.id}`} className={message.status === "en attente" ? "" : "hidden"}><p>Répondre</p></Link>
                        </div>
                        
                        </>
                    ))}
                </article>

        

        </>
    )
};

export default UserMsgRead;