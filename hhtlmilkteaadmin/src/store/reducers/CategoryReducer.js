import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    totalPages: 1
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        findAll: (state, action) => {
            state.categories = action.payload;
        },
        categoryPage: (state, action) => {
            state.categories = action.payload.content;
            state.totalPages = action.payload.totalPages;
        },
        categoryAdded: (state, action) => {
            state.categories.push(action.payload);
        },
        categoryDelete(state, action) {
            const { id, deletedAt } = action.payload;
            const existingCategory = state.categories.find((category) => category.id === id);
            if (existingCategory) {
                existingCategory.deletedAt = deletedAt;
            }
        },
        categoryUpdate(state, action) {
            const { id, name } = action.payload;
            const existingCategory = state.categories.find((category) => category.id === id);
            if (existingCategory) {
                existingCategory.name = name;
            }
        },
    },
});

const {
    reducer,
    actions
} = categorySlice;
export const {
    findAll,
    categoryPage,
    categoryAdded,
    categoryDelete,
    categoryUpdate
} = actions;
export default reducer;