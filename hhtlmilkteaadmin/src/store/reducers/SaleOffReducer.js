import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    saleOffs: [],
    totalPages: 1
};

const saleOffSlice = createSlice({
    name: "saleOff",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.saleOffs = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
    },
});

const {
    reducer,
    actions
} = saleOffSlice;
export const {
    findAll
} = actions;
export default reducer;