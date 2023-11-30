import { useState } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


function ProductAddPicForm (){

    const params = useParams();

    const [image, setImage] = useState(null);
    const [product_id, setProduct_id] = useState(params.id);
    
    const [msg, setMsg] = useState(null);

    async function handleUpload(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        const productId = params.id;
        formData.append('product_id', productId)
        



        try {
            const res = await fetch('/api/V1/pictures/add-pictures/' + params.id, {
              headers: {enctype : "multipart/form-data"},
              method: 'POST',
              body: formData,
            });
        const json = await res.json();
        setMsg(json.msg);

        } catch (error) {
            console.error('Erreur lors de l\'upload :', error.message);
        }
        
        /* if (res.status === 201) {
        setTimeout(()=>{
            navigate("/employes/stock")
        }, 2000)
        } */
    }

    return (

        <section className="form_section">

            <h3 className="form_title read">Ajouter une image</h3>

            <form onSubmit={handleUpload}>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>

                {<input
                    disabled
                    placeholder="ID du produit"
                    type="hidden"
                    name="product_id"
                    value={product_id}
                    onChange={(e) => setProduct_id(e.target.value)}
                />}
            
                {msg && <p className="msg_green">{msg}</p>}

                <button type="submit"><FontAwesomeIcon icon={faCircleCheck} className="fontawesomeGreen"/></button>

            </form>

        </section>
    );
};

export default ProductAddPicForm;