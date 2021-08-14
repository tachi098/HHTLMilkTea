import SizeOptionService from "../../services/SizeOptionService";
import {
    findAll,
    sizeOptionsPage,
    sizeOptionsAdded,
    sizeOptionsDelete,
    sizeOptionsUpdate
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


export const SizeOptionPageAction = (query) => async (dispatch) => {
    try {
        await SizeOptionService.page(query)
            .then((response) => dispatch(sizeOptionsPage(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const SizeOptionAddAction = (data) => async (dispatch) => {
    try {
        await SizeOptionService.add(data)
            .then((response) => dispatch(sizeOptionsAdded(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const SizeOptionDeleteAction = (data) => async (dispatch) => {
    try {
        const res = await SizeOptionService.delete(data);
        dispatch(sizeOptionsDelete(res.data));
    } catch (e) {
        return console.error(e);
    }
};

export const SizeOptionUpdateAction = (data) => async (dispatch) => {
    try {
        await SizeOptionService.update(data)
            .then((response) => dispatch(sizeOptionsUpdate(response.data)))
            .catch((error) => console.error(error));

    } catch (e) {
        return console.error(e);
    }
};