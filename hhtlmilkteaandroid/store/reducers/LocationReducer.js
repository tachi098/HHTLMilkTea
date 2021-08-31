import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locationPoint: {
        latitude: 10.8152726,
        longitude: 106.692674
    }
};

const LocationSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getLocation: (state, action) => {
            state.locationPoint = action.payload
        },
    },
});

const { reducer, actions } = LocationSlice;
export const { getLocation } = actions;
export default reducer;
