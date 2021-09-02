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
        }
    },
});

const {
    reducer,
    actions
} = ratingSlice;
export const {
    ratingAdded
} = actions;
export default reducer;