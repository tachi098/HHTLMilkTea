import { getLocation } from "./../reducers/LocationReducer";

export const setLocationAction = (data) => async (dispatch) => {
    try {
        dispatch(getLocation(data))
    } catch (error) {
        console.error(error);
    }
};