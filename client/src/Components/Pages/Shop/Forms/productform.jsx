import { Link  , useNavigate, useParams /*, useLocation */ } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { addToCart } from "../../../../store/slices/cart";

function ProductForm ({products}) {

    const params   = useParams();
    // const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { cartInfo } = useSelector((state) => state.cart);

    const [index, setIndex] = useState(0);
    const [sizes, setSizes] = useState("");
    

    useEffect(() => {
        async function getData() {
            try {
                const sizes = await fetch("/api/v1/products/sizes/" + params.id);
                if(sizes.status === 404) {
                    navigate("/not-found");
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
            <form action="submit" className="choose">
                
                
                    <label for="size" >Taille</label>
                    <select name="size" className="options" /* onChange={(e) => setIndex(parseInt(e.target.value) - 1)} */>
                        <option value="choose" selected disabled> Choisissez votre taille </option>
                        {!sizes ? (
                                    <>
                                    <option value="S"> Taille Unique </option>
                                    </>
                                ) : ( sizes.map( size =>
                                        <option value="S">{size.label}</option>
                        ))}
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

                <button type="submit" onClick={() => handleAddToCart()} class="add_to_cart">Ajouter au panier</button>

                <Link to="/guide_des_tailles" className="page_product_links"><p>Le guide des tailles</p></Link>
            
            </form>

        </>
    )
};

export default ProductForm;