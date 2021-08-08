import CategoryService from "../../services/CategoryService";
import {
    findAll
} from "./../reducers/CategoryReducer";

export const CategoryListAction = () => async (dispatch) => {
    try {
        await CategoryService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};