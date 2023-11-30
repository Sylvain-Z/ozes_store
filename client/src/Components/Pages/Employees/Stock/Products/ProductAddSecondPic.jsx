import { Link , useParams } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare , faCircleCheck , faTrashCan } from '@fortawesome/free-solid-svg-icons';


function ProductAddSecondPic (){

    const params   = useParams();   

    const [pics, setPics] = useState("");
    const [file_name, setFile_name] = useState("");
    const [caption, setCaption] = useState("");
    const [product_id, setProduct_id] = useState("");

    const [ msg, setMsg ] = useState("");
    const [ msg2, setMsg2 ] = useState("");
    
    useEffect(() => {
        async function getData() {
            try {
                const pics = await fetch("/api/v1/products/secondary-pictures/"+ params.id);
                const json = await pics.json();
                setPics(json);
                setProduct_id(json[0].product_id);
                
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, [pics]);

    
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/products/add-pictures/" + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file_name , caption , product_id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        setMsg2(json.msg2);
    };

    

    return (
        <>        
            <section className="form_section">

                <h3 className="form_title read">Tailles</h3>

                    <div className='pics_display'>
                        {!pics ? (
                                            <>
                                                <p className='pics_title'>Pas de tailles de produit existanttes</p>
                                            </>
                                        ) : ( pics.map( pic =>
                                            <>
                                                <div className='pics'>
                                                        <img className="little_image" src={`/assets/img/store/${pic.file_name}`} alt={pic.caption}/>
                                                        <button onClick={() => window.location.href =`/employes/stock/update-pic/${pic.product_id}/${pic.id}`} className="faPenToSquare"><FontAwesomeIcon icon={faPenToSquare} size="xs" className="fontawesomeBlue"/></button>
                                                        <button onClick={() => window.location.href =`/employes/stock/delete-pic/${pic.product_id}/${pic.id}`} className="faTrashCan"><FontAwesomeIcon icon={faTrashCan} size="xs" className="fontawesomeRed"/></button>
                                                </div>
                                                    
                                            </>
                                        ))}
                    </div>

                <form onSubmit={handleSubmit}>
                    
                    <label for="label">Entrez le nom de l'image *</label>
                    <input
                        required
                        placeholder="Nom de l'image"
                        type="text"
                        name="file_name"
                        value={file_name}
                        onChange={(e) => setFile_name(e.target.value)}
                    />
                    <label for="quantity">Ajouter une légende *</label>
                    <input
                        required
                        placeholder="Légende"
                        type="text"
                        name="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    <label for="product_id">Product ID *</label>
                    <input
                        required
                        placeholder="ID du produit"
                        type="text"
                        name="product_id"
                        value={product_id}
                        onChange={(e) => setProduct_id(e.target.value)}
                    />

                    {msg && <p className="msg_green">{msg}</p>}
                    {msg2 && <p className="msg_green">{msg2}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>

                </form>
            </section>

        </>
    )
};


export default ProductAddSecondPic;