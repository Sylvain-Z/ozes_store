
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function UpdateSize() {

    const navigate = useNavigate();
    const params = useParams();

    const [size, setSize] = useState(null); // stocke les informations de la taille

    const [id, setID] = useState(""); // gères les inputs du formulaire
    const [label, setLabel] = useState("");
    const [quantity, setQuantity] = useState("");
    const [product_id, setProduct_id] = useState("");

    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getSizeUpdate() {
            try {
                const size = await fetch(FETCH_URL + "sizes/" + params.product_id + "/" + params.size_id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                      },
                }); // trouve les informations de la taille par rapport à l'id du produit et l'id de la taille
                if (size.status === 404) {
                    navigate("/employes/not-found");
                }
                if (size.status === 200) {
                    const json = await size.json();
                    setSize(json);
                    setLabel(json[0].label);
                    setID(json[0].id);
                    setQuantity(json[0].quantity);
                    setProduct_id(json[0].product_id);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getSizeUpdate();
    }, []);


    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "sizes/update-sizes/" + params.product_id + "/" + params.id, { // mets à jour la taille par rapport à l'id du produit et l'id de la taille
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
            body: JSON.stringify({ label, quantity, product_id, id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);

        if (res.status === 201) {
            navigate("/employes/stock/actualiser/" + params.product_id);
        }
    }

    return (
        <>

            <p className="previous_page"><Link to={"/employes/stock/actualiser/" + params.product_id}>Retour</Link></p>

            <section className="form_section reserve">

                <h3 className="form_title read">Mise à jour de la taille</h3>

                <form onSubmit={handleSubmit}>

                    {!size ? (
                        <p>Taille non trouvé</p>
                    ) : (
                        <>
                            <div className="delete_fig">
                                <p className='cate_title'>{size[0].label}</p>
                            </div>

                        </>
                    )}

                    <label htmlFor="caption">Taille</label>
                    <input
                        required
                        placeholder="Taille"
                        type="text"
                        name="label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <label htmlFor="caption">Quantité</label>
                    <input
                        required
                        placeholder="Quantité"
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    {msg && <p className="msg_green">{msg}</p>}
                    {msg2 && <p className="msg_green">{msg2}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen" /></button>
                </form>

            </section>
        </>
    )
}

export default UpdateSize;