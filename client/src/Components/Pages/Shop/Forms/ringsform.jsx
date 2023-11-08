import { Link , useParams , useLocation } from "react-router-dom";

function RingsForm () {

    const params   = useParams();
    const { pathname } = useLocation();

    return (
        <>
            <form action="submit" className={pathname === "/le_store/bijoux/" + params.title_url ? "choose" : "hidden"}>

                <label for="symbole">Symbole</label>
                <select name="symbole" className="options">
                    <option value="choose" selected disabled> ♦♣♥♠ Choisissez votre symbole </option>
                    <option value="diamond" style={{color: "#C71212"}}> ♦ Carreau </option>
                    <option value="clubs" style={{color: "#0a0094"}}> ♣ Trèfle </option>
                    <option value="heart" style={{color: "#C71212"}}> ♥ Coeur </option>
                    <option value="spades" style={{color: "#0a0094"}}> ♠ Pique </option>
                </select>

                <label for="size">Taille</label>
                <select name="size" className="options">
                    <option value="S" selected>44</option>
                    <option value="45"> 45 </option>
                    <option value="..."> ... </option>
                    <option value="68" > 68 </option>
                    <option value="69"> 69 </option>
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

                <label for="engraving" >Gravure</label>
                <input type="text" name="engraving" placeholder="Ecrivez le mot que vous souhaitez graver" class="options" value=""/>

                <button type="submit" class="add_to_cart">Ajouter au panier</button>

            </form>


            <Link to="/size_guide" className="page_product_links"><p>Le guide des tailles</p></Link>
        </>
    )
};

export default RingsForm;