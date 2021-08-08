import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    sizeOptions: [],
};

const sizeOptionReducerSlice = createSlice({
    name: "sizeOption",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.sizeOptions = action.payload;
        },
    },
});

const {
    reducer,
    actions
} = sizeOptionReducerSlice;
export const {
    findAll
} = actions;
export default reducer;