import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    ratings: []
};

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        ratingAdded: (state, action) => {
            state.ratings.push(action.payload);
        },
        getRating: (state, action) => {
            state.ratings = action.payload;
        }
    },
});

const {
    reducer,
    actions
} = ratingSlice;
export const {
    ratingAdded,
    getRating
} = actions;
export default reducer;