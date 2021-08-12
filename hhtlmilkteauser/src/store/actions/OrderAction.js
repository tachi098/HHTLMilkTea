import OrderService from "../../services/OrderService";
import {
    add,
    find
} from "./../reducers/OrderReducer";

export const OrderAddAction = (data) => async (dispatch) => {
    try {
        await OrderService.add(data)
            .then((response) => dispatch(add(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const OrderFindAction = (data) => async (dispatch) => {
    try {
        await OrderService.find(data)
            .then((response) => dispatch(find(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};