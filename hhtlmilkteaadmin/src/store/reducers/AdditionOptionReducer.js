import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    additionOptions: [],
};

const additionOptionSlice = createSlice({
    name: "additionOption",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.additionOptions = action.payload;
        },
    },
});

const {
    reducer,
    actions
} = additionOptionSlice;
export const {
    findAll
} = actions;
export default reducer;