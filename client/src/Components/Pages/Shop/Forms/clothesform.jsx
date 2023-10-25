import { Link } from "react-router-dom";

function ClothesForm () {

    return (
        <>

            <label for="size" >Taille</label>
            <select name="size" className="options">
                <option value="S" selected> S </option>
                <option value="M"> M </option>
                <option value="L" > L </option>
                <option value="XL"> XL </option>
            </select>

            <label for="quantity">Quantité</label>
            <select name="quantity" className="options">
                <option value="1" selected> 1 </option>
                <option value="2"> 2 </option>
                <option value="3" > 3 </option>
                <option value="4"> 4 </option>
                <option value="5"> 5 </option>
                <option value="6"> 6 </option>
                <option value="7" > 7 </option>
                <option value="8"> 8 </option>
                <option value="9"> 9 </option>
            </select>

            <button type="submit" class="add_to_cart">Ajouter au panier</button>

            <Link to="/guide_des_tailles" className="page_product_links"><p>Le guide des tailles</p></Link>
        </>
    )
};

export default ClothesForm;