import RatingService from "../../services/RatingService";
import { ratingCustomer } from "../reducers/UserReducer";
import { ratingOrder } from "../reducers/OrderReducer";
import { getRating, ratingAdded } from "../reducers/RatingReducer";

export const RatingAddAction = (data) => async (dispatch) => {
    try {
        const res = await RatingService.add(data)
        dispatch(ratingAdded(res.data))
        dispatch(ratingCustomer(res.data))
        dispatch(ratingOrder())
    } catch (error) {
        console.error(error);
    }
};

export const getRatings = () => async (dispatch) => {
    try {
        await RatingService.get().then(
            (res) => { dispatch(getRating(res.data)) }
        ).catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};