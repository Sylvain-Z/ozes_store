import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import employeeReducer from "./slices/employee";
import deliveryInfoReducer from "./slices/deliveryInfo";
import cartReducer from "./slices/cart";

const store = configureStore({
    reducer: {
        user: userReducer,
        employee: employeeReducer,
        deliveryInfo: deliveryInfoReducer,
        cart: cartReducer,
    },
});

export { store };
