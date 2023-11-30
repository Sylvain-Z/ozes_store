import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import BackToStore from '../Containers/BackToStore/Index';

function Cart() {

  const { cartInfo } = useSelector((state) => state.cart);
  let cart = localStorage.getItem('cart')

  useEffect(() => {
    async function getData() {
      try {
        const items = await fetch("/api/v1/products/")
        

      } catch (error) {
        throw Error(error);
      }
    }

  }, []);

/*   function addQuantity() {
    
    let foundProduct = cart.find(p => p.ref == cartInfo.product.reference)

    if (foundProduct != undefined){
      foundProduct.quantity++;
    }
  } */

  function emptyCart (){
    localStorage.removeItem("cart");
    window.location.reload();
  };

    return (
      <>
        <h2>Votre panier</h2>

        {!cart ? (
          <>
            <h3>Votre panier est vide</h3>
            <BackToStore/>
          </>
        ) : (
          <>
            <h3>Votre panier contient des produits</h3>
            <button type="boutton" onClick={emptyCart} className="empty_cart_btn">Vider le panier</button>
          </>
        )}
      </>
    )
  }
  
  export default Cart;