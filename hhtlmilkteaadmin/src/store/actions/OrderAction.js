import { getListProcess, getListFail, getListSuccess, onStatus } from "./../reducers/OrderReducer";
import OrderService from "./../../services/OrderService";

export const OrderListProcess = (query) => async (dispatch) => {
    try {
        await OrderService.listProcess(query)
            .then((res) => dispatch(getListProcess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderListSuccess = (query) => async (dispatch) => {
    try {
        await OrderService.listSuccess(query)
            .then((res) => dispatch(getListSuccess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderListFail = (query) => async (dispatch) => {
    try {
        await OrderService.listFail(query)
            .then((res) => dispatch(getListFail(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderStatusUpdate = (data) => async (dispatch) => {
    try {
        await OrderService.updateStatus(data)
            .then((res) => dispatch(onStatus(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};