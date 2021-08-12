import { getListProcess, getListFail, getListSuccess } from "./../reducers/HistoryReducer";
import HistoryService from "./../../services/HistoryService";

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

// export const OrderStatusUpdate = (data) => async (dispatch) => {
//     try {
//         await HistoryService.updateStatus(data)
//             .then((res) => dispatch(onStatus(res.data)))
//             .catch((err) => console.error(err));
//     } catch (error) {
//         console.error(error);
//     }
// };