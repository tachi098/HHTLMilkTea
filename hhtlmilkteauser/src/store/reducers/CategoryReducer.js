import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    categories: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.categories = action.payload;
        },
    },
});

const {
    reducer,
    actions
} = categorySlice;
export const {
    findAll
} = actions;
export default reducer;