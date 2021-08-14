import AddtionOptionService from "../../services/AddtionOptionService";
import {
    additionOptionPage,
    additionOptionAdded,
    additionOptionDelete,
    additionOptionUpdate,
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

export const AdditionOptionPageAction = (query) => async (dispatch) => {
    try {
        await AddtionOptionService.page(query)
            .then((response) => dispatch(additionOptionPage(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const AdditionOptionAddAction = (data) => async (dispatch) => {
    try {
        await AddtionOptionService.add(data)
            .then((response) => dispatch(additionOptionAdded(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const AdditionOptionDeleteAction = (data) => async (dispatch) => {
    try {
        const res = await AddtionOptionService.delete(data);
        dispatch(additionOptionDelete(res.data));
    } catch (e) {
        return console.error(e);
    }
};

export const AdditionOptionUpdateAction = (data) => async (dispatch) => {
    try {
        await AddtionOptionService.update(data)
            .then((response) => dispatch(additionOptionUpdate(response.data)))
            .catch((error) => console.error(error));

    } catch (e) {
        return console.error(e);
    }
};