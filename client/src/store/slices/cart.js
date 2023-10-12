import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartInfo: JSON.parse(localStorage.getItem("cart")) || {
        buyer: null,
        product: [],
    },
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartInfo.buyer   = action.payload.buyer;
            state.cartInfo.product = action.payload.product;
        },
    },
});

export const { addToCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
