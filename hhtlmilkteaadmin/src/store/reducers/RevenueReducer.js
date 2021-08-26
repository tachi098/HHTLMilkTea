import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listRevenue: [],
    listYears: [],
    sumRevenue: 0,
    revenueToday: 0,
    listLastFiveOrders: [],
};

const RevenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {
        getListRevenue: (state, action) => {
            state.listRevenue = action.payload;
        },
        getYears: (state, action) => {
            state.listYears = action.payload;
        },
        getSumRevenues: (state, action) => {
            state.sumRevenue = action.payload;
        },
        getRevenueToday: (state, action) => {
            state.revenueToday = action.payload;
        },
        getListLastFiveOrders: (state, action) => {
            state.listLastFiveOrders = action.payload;
        },
    },
});

const { reducer, actions } = RevenueSlice;
export const { getListRevenue, getYears, getSumRevenues, getRevenueToday, getListLastFiveOrders } = actions;
export default reducer;