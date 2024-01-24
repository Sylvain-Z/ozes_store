import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    info : {
        isLogged: false,
        id: "Invite",
    },
};

export const employeeSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin: (state, action) => {
            state.info = {isLogged: true, id: action.payload.email};
        },
        signout: (state, action) => {
            state.info = {
                isLogged: false,
                id: "Invite",
            };
        }
    }
});


export const {signin, signout} = employeeSlice.actions

export default employeeSlice.reducer;