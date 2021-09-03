import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    ratings: [],
    totalPages: 1
};

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.ratings = action.payload;
        },
        ratingPage: (state, action) => {
            state.ratings = action.payload.content;
            state.totalPages = action.payload.totalPages;
        }
    },
});

const {
    reducer,
    actions
} = ratingSlice;
export const {
    findAll,
    ratingPage,
} = actions;
export default reducer;