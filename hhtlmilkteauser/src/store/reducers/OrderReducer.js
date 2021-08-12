import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    order: {},
    quantity: 0,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        add: (state, action) => {
            state.order = action.payload.order;
            state.quantity = action.payload.quantity;
        },
        find: (state, action) => {
            state.order = action.payload.order;
            state.quantity = action.payload.quantity;
        },
    },
});

const {
    reducer,
    actions
} = orderSlice;
export const {
    add,
    find
} = actions;
export default reducer;