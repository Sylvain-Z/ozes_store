import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate, useParams , /* useLocation */ } from "react-router-dom";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCottonBureau } from '@fortawesome/free-brands-svg-icons';

import { addToCart } from "../../../store/slices/cart";

import Loading from "../Containers/Loading";
// import ClothesForm from "./Forms/clothesform"
// import RingsForm from "./Forms/ringsform"

function ProductPage (){

    const { cartInfo } = useSelector((state) => state.cart);

    const params   = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { pathname } = useLocation();

    const [clothes, setClothes] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        async function getData() {
            try {
                const clothes = await fetch("/api/v1/products/vetements/" + params.title_url);
                if(clothes.status === 404) {
                    navigate("/not-found");
                }
                if(clothes.status === 200){
                    const json = await clothes.json();
                    setClothes(json);
                }
                               
                } catch (error) {
                    throw Error(error);
                }
                }
                getData();
                }, []);

    function handleAddToCart() {
        const indexProduct = cartInfo.product.findIndex(
            (product_cart) => product_cart.reference === clothes[index].reference
        );
        
        if (indexProduct === -1) {
            const newCart = {
                product: [
                    ...cartInfo.product,
                    { ref: clothes[index].reference, quantity: 1, priceEach: parseFloat(clothes[index].price) },
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
                buyer: localStorage.getItem("myuserID"),
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
            <Link to="/le_store"><p className="previous_page">Retour à la liste des produits</p></Link>

                {!clothes ? (
                    <Loading/>
                    
                ) : (
                    <div className="product_page">
                        <div className="shop">

                            <img className="product_image" src={require("../../../assets/img/store/" + clothes[index].file_name1)} alt={clothes[index].caption1}/>

                            <article className="product_description">
                                <h2 className="product_name">{clothes[index].title}</h2>
                                <p className="price"><strong>{clothes[index].price}€</strong></p>
                                <p className="color"><strong>Couleur : {clothes[index].color}</strong></p>

                                <form action="submit" className="choose">
                
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

                                    <button type="submit" onClick={() => handleAddToCart()} class="add_to_cart">Ajouter au panier</button>

                                </form>

                                <Link to="/guide_des_tailles" className="page_product_links"><p>Le guide des tailles de veêtem</p></Link>
                                    

                            </article>
                        </div>

                        <p className="ring_description">{clothes[index].description}</p>

                        <p className="infosup">{clothes[index].shape}</p>

                        <p className="infosupplus">{clothes[index].model_info}</p>

                        <p className={clothes[index].material_style}><FontAwesomeIcon icon={faCottonBureau} style={{color: "#ffffff",}} /> {clothes[index].material}</p>

                        <p className="infosup">{clothes[index].madeplace}</p>

                    </div>
                    )}
            
            
        </>
    )
};


export default ProductPage;