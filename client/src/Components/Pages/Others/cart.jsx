import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import BackToStore from '../Containers/BackToStore/index';

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

  function addQuantity() {
    
    let foundProduct = cart.find(p => p.ref == cartInfo.product.reference)

    if (foundProduct != undefined){
      foundProduct.quantity++;
    }
  }



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
        <h3>Votre panier est plein</h3>


          </>
        )}
        
      </>
    )
  }
  
  export default Cart;