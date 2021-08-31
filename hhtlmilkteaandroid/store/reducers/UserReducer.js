import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customer: {},
    wishlist: null,
    error: {},
};

const userSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        userbyusername: (state, action) => {
            state.customer = action.payload.user;
            state.wishlist = action.payload.wishlistResponse;
        },
        profileUpdate: (state, action) => {
            state.customer = action.payload;
        },
        getWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        updateWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        deleteProductWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        profileuser: (state, action) => {
            state.customer = action.payload.user;
        },
        logoutCustomer: (state, action) => {
            state.customer = {};
            state.wishlist = null;
        },
    },
});

const { reducer, actions } = userSlice;
export const {
    userbyusername,
    profileUpdate,
    updateWishlist,
    deleteProductWishlist,
    profileuser,
    logoutCustomer,
    getWishlist,
} = actions;
export default reducer;
