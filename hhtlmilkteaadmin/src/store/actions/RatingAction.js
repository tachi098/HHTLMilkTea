import RatingService from "../../services/RatingService";
import {
    findAll,
    ratingPage
} from "./../reducers/RatingReducer";

export const RatingListAction = () => async (dispatch) => {
    try {
        await RatingService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const RatingPageAction = (query) => async (dispatch) => {
    try {
        await RatingService.page(query)
            .then((response) => dispatch(ratingPage(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};