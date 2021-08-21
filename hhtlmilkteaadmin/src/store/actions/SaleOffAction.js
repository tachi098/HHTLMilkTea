import SaleOffService from "../../services/SaleOffService";
import {
    findAll,
    saleOffPage,
    saleOffAdded,
    saleOffDelete,
} from "./../reducers/SaleOffReducer";

export const SaleOffListAction = () => async (dispatch) => {
    try {
        await SaleOffService.list()
            .then((response) => dispatch(findAll(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const SaleOffPageAction = (query) => async (dispatch) => {
    try {
        await SaleOffService.page(query)
            .then((response) => dispatch(saleOffPage(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const SaleOffAddAction = (data) => async (dispatch) => {
    try {
        await SaleOffService.add(data)
            .then((response) => dispatch(saleOffAdded(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const SaleOffDeleteAction = (id) => async (dispatch) => {
    try {
        await SaleOffService.delete(id)
            .then((response) => dispatch(saleOffDelete(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};