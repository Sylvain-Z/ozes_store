import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FETCH_URL } from '../../../../../assets/const';
import { getItemWithExpiration } from '../../../../../assets/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function ProductAddSizes() {

    const params = useParams();

    const [sizes, setSizes] = useState(null); // affiche les tailles existantes du produit

    const [label, setLabel] = useState(""); // gèrent le formulaire
    const [quantity, setQuantity] = useState("");
    const [product_id, setProduct_id] = useState("");

    const [msg, setMsg] = useState("");
    const [msg2, setMsg2] = useState("");

    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function getProductSizes() {
            try {
                const size = await fetch(FETCH_URL + "sizes/" + params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN_EMPL}`,
                      },
                });
                const json = await size.json();
                setSizes(json);
                setProduct_id(json[0].product_id);

            } catch (error) {
                throw Error(error);
            }
        }
        getProductSizes();
    }, [sizes]);


    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(FETCH_URL + "sizes/add-sizes/" + params.id, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${TOKEN_EMPL}`,
              },
            body: JSON.stringify({ label, quantity, product_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
    };

    const  handleDelete = async (product_id, id) => {
        const confirmed = window.confirm("Êtes-vous sûr de supprimer cette image ?");
        if (confirmed) {
            const res = await fetch(FETCH_URL + "sizes/delete/" + product_id + "/" + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `Bearer ${TOKEN_EMPL}`,
                  },
                body: JSON.stringify({ product_id, id }),
            });
        const json = await res.json();
        setMsg(json.msg);
        }
      };


    return (
        <>
            <section className="form_section">

                <h3 className="form_title read">Tailles</h3>

                <div className='sizes_display'>
                    {!sizes ? (
                        <>
                            <p className='sizes_title'>Pas de tailles de produit existanttes</p>
                        </>
                    ) : (sizes.map(size =>
                        <>
                            <div className='sizes' key={size.id}>
                                <p className='sizes_title'>{size.label} - Quantité : {size.quantity}</p>
                                <Link to={`/employes/stock/update-size/${size.product_id}/${size.id}`} className="faPenToSquare"><p><FontAwesomeIcon icon={faPenToSquare} className="fontawesomeBlue" size="xs" /></p></Link>
                                <button className="faTrashCan" onClick={() => handleDelete(size.product_id, size.id)}><FontAwesomeIcon icon={faTrashCan} className="fontawesomeRed" size="xs" /></button>
                            </div>

                        </>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>

                    <p className="form_advise">
                        <em>Un produit doit toujours avoir au moins une taille, veillez à ajouter une taille avant de supprimer la seule taille du produit</em></p>

                    <label htmlFor="label">Ajouter une taille *</label>
                    <input
                        required
                        placeholder="Libellé"
                        type="text"
                        name="label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <label htmlFor="quantity">Ajouter une quantité *</label>
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
};


export default ProductAddSizes;