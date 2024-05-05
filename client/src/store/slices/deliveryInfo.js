import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    deliveryInfo : {
        firstname : "",
        lastname : "",
        number : "",
        street : "",
        complement : "",
        postal_code : "",
        city : "",
        phone : "",
        pseudo : "",
    },
};

export const deliveryInfoSlice = createSlice({
    name: "deliveryInfo",
    initialState,
    reducers: {
        update: (state, action) => {
            state.deliveryInfo = {
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                number: action.payload.firstname,
                street: action.payload.firstname,
                complement: action.payload.firstname,
                postal_code: action.payload.firstname,
                city: action.payload.firstname,
                phone: action.payload.firstname,
                pseudo: action.payload.firstname, };
        },
        
    }
});


export const { update } = deliveryInfoSlice.actions

export default deliveryInfoSlice.reducer;