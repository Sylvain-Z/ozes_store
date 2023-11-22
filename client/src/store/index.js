import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import employeesReducer from "./slices/employees";
import deliveryInfoReducer from "./slices/deliveryInfo";
import cartReducer from "./slices/cart";

const store = configureStore({
    reducer: {
        user: userReducer,
        employees: employeesReducer,
        deliveryInfo: deliveryInfoReducer,
        cart: cartReducer,
    },
});

export { store };
