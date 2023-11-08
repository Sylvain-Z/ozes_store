import { Link , useParams , useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

function ClothesForm () {

    const params   = useParams();
    const { pathname } = useLocation();
    /* const dispatch = useDispatch();
    
    const { cartInfo } = useSelector((state) => state.cart);

    const [tshirts, setTshirts] = useState(null);
    const [index, setIndex] = useState(0);


    function handleAddToCart() {
        const indexProduct = cartInfo.product.findIndex(
            (product_cart) => product_cart.ref === tshirts[index].ref
        );
        
        if (indexProduct === -1) {
            const newCart = {
                product: [
                    ...cartInfo.product,
                    { ref: tshirts[index].ref, quantity: 1, priceEach: parseFloat(tshirts[index].price) },
                ],
                buyer: info.id,
            };
            localStorage.setItem("cart", JSON.stringify(newCart));
            dispatch(addToCart(newCart));
        } else {
            const newCart = {
                product: [
                    ...cartInfo.product,
                ],
                buyer: info.id,
            };
            newCart.product[indexProduct] = {
                ...newCart.product[indexProduct],
                quantity: cartInfo.product[indexProduct].quantity + 1,
            };
            localStorage.setItem("cart", JSON.stringify(newCart));
            dispatch(addToCart(newCart));
        }
    } */

    return (
        <>
            
            <form action="submit" className={pathname === "/le_store/vetements/" + params.title_url ? "choose" : "hidden"}>
                
                <label for="size" >Taille</label>
                <select name="size" className="options" /* onChange={(e) => setIndex(parseInt(e.target.value) - 1)} */>
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

                <button type="submit" /* onClick={() => handleAddToCart()} */ class="add_to_cart">Ajouter au panier</button>

            </form>

            <Link to="/guide_des_tailles" className="page_product_links"><p>Le guide des tailles</p></Link>
        </>
    )
};

export default ClothesForm;