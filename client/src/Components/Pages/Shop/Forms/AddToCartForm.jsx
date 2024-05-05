import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FETCH_URL } from '../../../../assets/const';
import { getItemWithExpiration } from '../../../../assets/functions';

import { addToCart } from "../../../../store/slices/cart";

function AddToCartForm({ product }) {

    const myuserid = getItemWithExpiration("myuserid");

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartInfo } = useSelector((state) => state.cart);  // reducer du panier

    const [sizes, setSizes] = useState(""); // affiche dynamiquement via la BDD les tailles disponible pour l'article
    const [sizesChoice, setSizesChoice] = useState(""); // sert à gérer le choix de taille dans le formulaire

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);

    useEffect(() => {
        async function getSizeAddToCart() {
            try {
                const sizes = await fetch(FETCH_URL + "products/sizes/" + params.id);
                if (sizes.status === 404) {
                    navigate("/not-found");
                }
                if (sizes.status === 200) {
                    const json = await sizes.json();
                    setSizes(json);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getSizeAddToCart();
    }, []);

    function handleAddToCart(e) {
        e.preventDefault();

        const indexProduct = cartInfo.product.findIndex(
            (product_cart) => product_cart.ref === product.reference && product_cart.size === sizesChoice
        );

        let validSizeSelected = true; // empêche l'utilisateur de valider le formulaire sans avoir sélectionner une taille

        if (!sizesChoice) {
            setMsg("Sélectionnez une taille !")
            validSizeSelected = false;
            setTimeout(() => {
                setMsg("")
            }, 5000)
        }
        if (validSizeSelected) { // la fonction n'est active que si une taille a été choisie dans le <select>
            if (indexProduct === -1) {
                const newCart = {
                    product: [
                        ...cartInfo.product,
                        {
                            ref: product.reference,
                            product_id: product.product_id,
                            quantity: 1,
                            size: sizesChoice,
                            priceEach: parseFloat(product.price)
                        },
                    ],
                    buyer: myuserid,
                };
                localStorage.setItem("cart", JSON.stringify(newCart));
                dispatch(addToCart(newCart));
            } else {
                const newCart = {
                    product: [
                        ...cartInfo.product,
                    ],
                    buyer: myuserid,
                };
                newCart.product[indexProduct] = {
                    ...newCart.product[indexProduct],
                    quantity: cartInfo.product[indexProduct].quantity + 1,
                };
                localStorage.setItem("cart", JSON.stringify(newCart));
                dispatch(addToCart(newCart));
            }

            setMsg2("Votre article a été ajouté au panier");
            setTimeout(() => {
                setMsg2("")
            }, 5000)
        }
    };

    return (
        <>
            <form onSubmit={handleAddToCart} className="choose">


                <label htmlFor="size" >Taille</label>
                <select
                    selected
                    name="size"
                    className="options"
                    onChange={(e) => setSizesChoice(e.target.value)}
                >
                    <option value="rien" selected disabled > Selectionner la taille </option>
                    {!sizes ? (
                        <>
                            <option value="Unique"> Taille Unique </option>
                        </>
                    ) : (sizes.map((size) => (
                        <option
                            key={size.id}
                            value={size.label}
                            disabled={size.quantity === 0 ? true : false}
                        >
                            {size.label}{size.quantity <= 10 ? ` - Quantité restante : ${size.quantity}` : ""}
                        </option>
                    )))}
                </select>


                {msg && <p className="msg_size">{msg}</p>}
                {msg2 && <p className="msg_green">{msg2}</p>}

                <button type="submit" class="add_to_cart">Ajouter au panier</button>

                <p><Link to="/guide_des_tailles" className="page_product_links">Le guide des tailles</Link></p>

            </form>

        </>
    )
};

export default AddToCartForm;