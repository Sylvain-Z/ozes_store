import { Link , useParams , useNavigate} from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare , faCirclePlus , faCircleCheck , faTrashCan } from '@fortawesome/free-solid-svg-icons';


function ProductAddSizes (){

    const params   = useParams();
    const navigate = useNavigate();

    const [ inputHidden, setInptuHidden ] = useState(false);
    const toggleInput = () => setInptuHidden(!inputHidden);
    

    const [sizes, setSizes] = useState("");
    const [label, setLabel] = useState("");
    const [quantity, setQuantity] = useState("");
    const [product_id, setProduct_id] = useState("");

    const [ msg, setMsg ] = useState("");
    const [ msg2, setMsg2 ] = useState("");
    
    useEffect(() => {
        async function getData() {
            try {
                const size = await fetch("/api/v1/sizes/"+ params.id);
                const json = await size.json();
                setSizes(json);
                setProduct_id(json[0].product_id);
                
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, [sizes]);

    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/sizes/add-sizes/" + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label , quantity , product_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
    };

    

    return (
        <>
        
        <Link to="/employes/stock"><p className="previous_page">Retour à la liste des produits</p></Link>
        
            <section className="form_section">

                <h3 className="form_title read">Tailles</h3>

                    <div className='sizes_display'>
                        <p className='title_p'>Tailles</p>
                        {!sizes ? (
                                            <>
                                                <p className='sizes_title'>Pas de tailles de produit existanttes</p>
                                            </>
                                        ) : ( sizes.map( size =>
                                            <>
                                                <div className='sizes'>
                                                        <p className='sizes_title'>{size.label} - Quantité : {size.quantity}</p>
                                                        <button onClick={() => window.location.href =`/employes/stock/update-size/${size.product_id}/${size.id}`} className="faPenToSquare"><FontAwesomeIcon icon={faPenToSquare} size="xs" className="fontawesomeBlue"/></button>
                                                        <button onClick={() => window.location.href =`/employes/stock/delete-size/${size.product_id}/${size.id}`} className="faTrashCan"><FontAwesomeIcon icon={faTrashCan} size="xs" className="fontawesomeRed"/></button>
                                                </div>
                                                    
                                            </>
                                        ))}
                    </div>

                <form onSubmit={handleSubmit}>

                    <p className="form_advise">
                            <em>Ajouter une taille</em></p>
                    
                    <label for="caption">Taille</label>
                    <input
                        placeholder="Taille"
                        type="text"
                        name="label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                    <label for="caption">Quantité</label>
                    <input
                        placeholder="Quantité"
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    {msg && <p className="msg_green">{msg}</p>}
                    {msg2 && <p className="msg_green">{msg2}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>

                </form>
            </section>

        </>
    )
};


export default ProductAddSizes;