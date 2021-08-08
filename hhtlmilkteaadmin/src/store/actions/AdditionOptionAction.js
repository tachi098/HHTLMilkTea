import AddtionOptionService from "../../services/AddtionOptionService";
import {
    findAll
} from "./../reducers/AdditionOptionReducer";

export const AdditionOptionListAction = () => async (dispatch) => {
    try {
        await AddtionOptionService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};