import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { FETCH_URL } from '../../../../assets/const';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

function ContactForm(){
        
      const [ id, setId ]             = useState(uuidv4().slice(0, 20)); // à chaque chargement du composant une chaine de 16 caractères aléatoire sera stocké

      const [user_pseudo, setUser_pseudo]       = useState("Invité");
      const [user_email, setUser_email]       = useState("");
      const [subject, setSubject]         = useState("");
      const [content, setContent]             = useState("");
      const [user_id, setUser_id]         = useState(null);

      const [msg, setMsg]                   = useState(null);

      async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "messages/write", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, user_pseudo, user_email, subject, content, user_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
    }

    return (
        <>
            <section className="form_section">

                  <FontAwesomeIcon icon={faMessage} className="fontawesome fontawesomeYellow"/>
  
                  <h3 className="form_title read">Écrivez-nous</h3>

                  <form onSubmit={handleSubmit}>

                        {msg && <p className="msg_green">{msg}</p>}

                        <input
                              placeholder="ID du client"
                              type="hidden"
                              name="id"
                              value={id}
                              onChange={(e) => setId(e.target.value.replace)}
                        />
                        <input
                              required
                              disabled
                              placeholder="Pseudo"
                              type="hidden"
                              name="user_pseudo"
                              value={user_pseudo}
                              onChange={(e) => setUser_pseudo(e.target.value)}                          
                        />
                        <label htmlFor="subject">Votre mail</label>
                        <input
                              required
                              placeholder="Votre email"
                              type="email"
                              name="email"
                              value={user_email}
                              onChange={(e) => setUser_email(e.target.value)}                          
                        />
                        <label htmlFor="subject">Sujet</label>
                        <input
                              required
                              placeholder="Sujet"
                              type="text"
                              name="subject"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                        />
                        <label htmlFor="content">Message</label>
                        <textarea className="form_input textarea"
                              required
                              placeholder="Votre message"
                              type="text"
                              name="content"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}                     
                        />
                        <input
                              placeholder="votre identifiant"
                              type="hidden"
                              name="user_id"
                              value={user_id}
                              onChange={(e) => setUser_id(e.target.value)}
                        />
                        
                        <button type="submit">Envoyer</button>

                  </form>
            </section>
        
        </>
    )
}

export default ContactForm;