import { Link , useNavigate , useParams } from "react-router-dom";
import { useState , useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function DeleteProfil (){

    const navigate = useNavigate();
    const params   = useParams();

    const [id, setId] = useState("");
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const employee = await fetch("/api/v1/employees/glimpse/" + params.id);
                if(employee.status === 404) {
                    navigate("/employes/not-found");
                }
                if(employee.status === 200){
                    const json = await employee.json();
                    setEmployee(json);
                    setId(json[0].id)
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
        const res = await fetch("/api/v1/employees/delete/" + params.id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        const json = await res.json();
        setMsg(json.msg);
        
        if (res.status === 201) {
            setTimeout(()=>{
                navigate("/employes/gestion-comptes");
            }, 2000)
        }
    }
                
    return (
        <>
            <Link to="/employes/gestion-comptes"><p className="previous_page">Retour à la liste des profils</p></Link>

            <section className="form_section">

                <h3 className="form_title update">Suppression d'un produit</h3>

                <p className="msg_red">Êtes-vous sûr de vouloir supprimer ce profil ? Cette action est irréversible</p>

                <form onSubmit={handleSubmit}>

                    {!employee ? (
                                    <p>Produit non trouvé</p>
                                ) : (
                                <>
                                    <figure className="delete_fig">
                                        <img src={require("../../../../assets/img/user_out.png")} alt="pictograme buste" />
                                        <figcaption>
                                            <p>{employee[0].firstname} {employee[0].lastname}</p>
                                            {employee[0].role === 1 ? (<p>Role : Administrateur</p>) : (<p>Role : Collaborateur</p>)}
                                        </figcaption>
                                    </figure>
                                
                                </>
                                )}

                

                    {msg && <p className="msg_green">{msg}</p>}

                    <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>
                    <Link to={`/employes/gestion-comptes`} className="button_retour_rouge"><p ><FontAwesomeIcon icon={faDeleteLeft} className="fontawesomeRed" /></p></Link>

                </form>



            </section>


        </>
    )
};


export default DeleteProfil;