import OrderService from "../../services/OrderService";
import { profileuser } from "../reducers/UserReducer";
import {
    add,
    find,
    update,
    deleteOrderDetail,
    checkoutSuccess
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

export const OrderUpdateQuantity = (data) => async (dispatch) => {
    try {
        await OrderService.udpate(data)
            .then((response) => dispatch(update(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};


export const OrderDelteOrderDetail = (id) => async (dispatch) => {
    try {
        await OrderService.delete(id)
            .then((response) => dispatch(deleteOrderDetail(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};

export const checkoutOrder = (data) => async (dispatch) => {
    try {
        await OrderService.checkout(data)
            .then((response) => dispatch(profileuser(response.data)))
            .then((response) => dispatch(checkoutSuccess(response.data)))
            .catch((error) => console.error(error));
    } catch (error) {
        console.error(error);
    }
};