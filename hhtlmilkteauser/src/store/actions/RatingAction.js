import RatingService from "../../services/RatingService";
import { ratingCustomer } from "../reducers/UserReducer";
import { ratingOrder } from "../reducers/OrderReducer";

export const RatingAddAction = (data) => async (dispatch) => {
    try {
        await RatingService.add(data)
        dispatch(ratingCustomer())
        dispatch(ratingOrder())
    } catch (error) {
        console.error(error);
    }
};