
import { Link , useNavigate , useParams } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function DeleteSizes() {

    const navigate = useNavigate();
    const params   = useParams();

    const [sizes, setSizes] = useState(null);
    const [id, setID] = useState(null);
    const [size_id, setSize_id] = useState("");
    const [product_id, setProduct_id] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const sizes = await fetch("/api/v1/sizes/" + params.product_id + "/" + params.size_id );
                if(sizes.status === 404) {
                    navigate("/employes/not-found");
                }
                if(sizes.status === 200){
                    const json = await sizes.json();
                    setSizes(json);
                }   
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, []);

                
    const [msg, setMsg] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch("/api/v1/sizes/delete/" + params.product_id + "/" + params.size_id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id , id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        
        if (res.status === 201) {
            setTimeout(()=>{
                navigate("/employes/stock/actualiser/" + params.product_id);
            }, 2000)
        }
    }

return (
    <>

        <Link to="/employes/stock/categories"><p className="previous_page">Retour à la liste des produits</p></Link>

        <section className="form_section categories">

            <h3 className="form_title update">Suppression d'une taille</h3>

            <p className="msg_red">Êtes-vous sûr de vouloir supprimer cette taille ? Cette action est irréversible</p>

            <form onSubmit={handleSubmit}>

                {!sizes ? (
                                <p>Taille non trouvé</p>
                            ) : (
                            <>
                                <div className="delete_fig">
                                    <p className='cate_title'>{sizes[0].label}</p>
                                </div>
                            
                            </>
                            )}

                {msg && <p className="msg_green">{msg}</p>}

                <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                <button type="button" onClick={() => window.location.href ="/employes/stock/actualiser/" + params.product_id}><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></button>

            </form>



</section>
    
    </>
)


}

export default DeleteSizes;