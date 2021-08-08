import SizeOptionService from "../../services/SizeOptionService";
import {
    findAll
} from "./../reducers/SizeOptionReducer";

export const SizeOptionAction = () => async (dispatch) => {
    try {
        await SizeOptionService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};