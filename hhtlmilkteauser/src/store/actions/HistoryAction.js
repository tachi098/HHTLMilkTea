import { getListProcess, getListFail, getListSuccess, onStatus } from "./../reducers/HistoryReducer";
import HistoryService from "./../../services/HistoryService";
import { statusOrderCustomer } from "../reducers/UserReducer";

export const HistoryListProcess = (query) => async (dispatch) => {
    try {
        await HistoryService.listProcess(query)
            .then((res) => dispatch(getListProcess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const HistoryListSuccess = (query) => async (dispatch) => {
    try {
        await HistoryService.listSuccess(query)
            .then((res) => dispatch(getListSuccess(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const HistoryListFail = (query) => async (dispatch) => {
    try {
        await HistoryService.listFail(query)
            .then((res) => dispatch(getListFail(res.data)))
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
    }
};

export const OrderStatusUpdate = (data, memberVip) => async (dispatch) => {
    try {
        const res = await HistoryService.updateStatus(data)
        dispatch(onStatus(res.data));
        dispatch(statusOrderCustomer(memberVip))
    } catch (error) {
        console.error(error);
    }
};