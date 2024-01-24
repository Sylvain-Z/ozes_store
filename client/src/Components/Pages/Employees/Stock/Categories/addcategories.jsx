import { useState } from 'react';

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function AddCategories() {

    const [inputHidden, setInptuHidden] = useState(false); // gère la dissimulation et l'apparition des inputs du formulaire
    const toggleInput = () => setInptuHidden(!inputHidden);

    const [cate_title, setCate_title] = useState("");
    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const TOKEN_EMPL = getItemWithExpiration('authe');
        const res = await fetch(FETCH_URL + "categories/add-category", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
            body: JSON.stringify({ cate_title }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
    };

    return (

        <>
            <form onSubmit={handleSubmit} className="form_reserve form_cate">
                <p onClick={toggleInput} className="reserve_btn"><FontAwesomeIcon icon={faCirclePlus} className="faIcon" />Catégorie</p>

                <input
                    required
                    placeholder="Nouvelle catégorie"
                    type={!inputHidden ? "hidden" : "text"}
                    name="cate_title"
                    value={cate_title}
                    onChange={(e) => setCate_title(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                />

                {msg && <p className={!inputHidden ? "hidden" : "msg_red msg"}>{msg}</p>}
                {msg2 && <p className={!inputHidden ? "hidden" : "msg_green msg"}>{msg2}</p>}

                <button type="submit"><FontAwesomeIcon icon={faCircleCheck} size="lg" className={!inputHidden ? "hidden" : "fontawesomeGreen msg"} /></button>
            </form>
        </>
    )


};

export default AddCategories;