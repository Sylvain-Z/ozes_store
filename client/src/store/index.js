import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user";
import employeesReducer from "./slices/employees";
import cartReducer from "./slices/cart";

const store = configureStore({
    reducer: {
        user: userReducer,
        employees: employeesReducer,
        cart: cartReducer,
    },
});

export { store };
