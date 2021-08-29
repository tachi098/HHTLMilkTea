import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    additionOptions: [],
    totalPages: 1
};

const additionOptionSlice = createSlice({
    name: "additionOption",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.additionOptions = action.payload;
        },
        additionOptionPage: (state, action) => {
            state.additionOptions = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
        additionOptionAdded: (state, action) => {
            state.additionOptions.push(action.payload);
        },
        additionOptionDelete(state, action) {
            // const { id, deletedAt } = action.payload;
            // const existingAdditionOption = state.additionOptions.find((additionOption) => additionOption.id === id);
            // if (existingAdditionOption) {
            //     existingAdditionOption.deletedAt = deletedAt;
            // }

            state.additionOptions = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
        additionOptionUpdate(state, action) {
            const { id, name } = action.payload;
            const existingAdditionOption = state.additionOptions.find((additionOption) => additionOption.id === id);
            if (existingAdditionOption) {
                existingAdditionOption.name = name;
            }
        },
    },
});

const {
    reducer,
    actions
} = additionOptionSlice;
export const {
    findAll,
    additionOptionPage,
    additionOptionAdded,
    additionOptionDelete,
    additionOptionUpdate
} = actions;
export default reducer;