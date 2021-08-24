import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    newProductId: "",
};

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload.product;
            state.newProductId = action.payload.newProductId;
        },
    },
});

const { reducer, actions } = ProductSlice;
export const { getProducts } = actions;
export default reducer;
