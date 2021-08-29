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
        sizeOptionsPage: (state, action) => {
            state.sizeOptions = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
        sizeOptionsAdded: (state, action) => {
            state.sizeOptions.push(action.payload);
        },
        sizeOptionsDelete(state, action) {
            // const { id, deletedAt } = action.payload;
            // const existingSizeOptions = state.sizeOptions.find((sizeOption) => sizeOption.id === id);
            // if (existingSizeOptions) {
            //     existingSizeOptions.deletedAt = deletedAt;
            // }
            state.sizeOptions = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
        sizeOptionsUpdate(state, action) {
            const { id, name } = action.payload;
            const existingSizeOptions = state.sizeOptions.find((sizeOption) => sizeOption.id === id);
            if (existingSizeOptions) {
                existingSizeOptions.name = name;
            }
        },
    },
});

const {
    reducer,
    actions
} = sizeOptionReducerSlice;
export const {
    findAll,
    sizeOptionsPage,
    sizeOptionsAdded,
    sizeOptionsDelete,
    sizeOptionsUpdate
} = actions;
export default reducer;