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
            state.saleOffs = action.payload;
        },
        saleOffPage: (state, action) => {
            state.saleOffs = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
        saleOffAdded: (state, action) => {
            state.saleOffs.push(action.payload);
        },
        saleOffDelete(state, action) {
            return state.saleOffs.filter((saleOff) => {
                return saleOff.id !== action.payload.id
            });
        },
    },
});

const {
    reducer,
    actions
} = saleOffSlice;
export const {
    findAll,
    saleOffPage,
    saleOffAdded,
    saleOffDelete,
} = actions;
export default reducer;