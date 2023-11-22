import { Link , useParams , useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { addToCart } from "../../../../store/slices/cart";

function RingsForm ({products}) {

    const params   = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    
    const { cartInfo } = useSelector((state) => state.cart);

    const [index, setIndex] = useState(0);


    function handleAddToCart() {
        const indexProduct = cartInfo.product.findIndex(
            (product_cart) => product_cart.ref === products[index].ref
        );
        
        if (indexProduct === -1) {
            const newCart = {
                product: [
                    ...cartInfo.product,
                    { ref: products[index].reference, quantity: 1, priceEach: parseFloat(products[index].price) },
                ],
                buyer: localStorage.getItem("myuserid"),
            };
            localStorage.setItem("cart", JSON.stringify(newCart));
            dispatch(addToCart(newCart));
        } else {
            const newCart = {
                product: [
                    ...cartInfo.product,
                ],
                buyer: localStorage.getItem("myuserid"),
            };
            newCart.product[indexProduct] = {
                ...newCart.product[indexProduct],
                quantity: cartInfo.product[indexProduct].quantity + 1,
            };
            localStorage.setItem("cart", JSON.stringify(newCart));
            dispatch(addToCart(newCart));
        }
    }

    return (
        <>
            <form action="submit" className={pathname === "/le_store/bijoux/" + params.title_url  + "/" + params.id ? "choose" : "hidden"}>

                <label for="symbole">Symbole</label>
                <select name="symbole" className="options">
                    <option value="choose" selected disabled> ♦♣♥♠ Choisissez votre symbole </option>
                    <option value="diamond" className="ring_symbol_red"> ♦ Carreau </option>
                    <option value="clubs" className="ring_symbol_blue"> ♣ Trèfle </option>
                    <option value="heart" className="ring_symbol_red"> ♥ Coeur </option>
                    <option value="spades" className="ring_symbol_blue"> ♠ Pique </option>
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

                <button type="submit" onClick={() => handleAddToCart()} class="add_to_cart">Ajouter au panier</button>
                
                <Link to="/size_guide" className="page_product_links"><p>Le guide des tailles</p></Link>
            
            </form>


            
        </>
    )
};

export default RingsForm;