import api from "./../common/APIClient";

class HistoryService {
    listProcess = (query) => {
        return api.get("/order/listProcess", { params: query });
    };

    listSuccess = (query) => {
        return api.get("/order/listSuccess", { params: query });
    };

    listFail = (query) => {
        return api.get("/order/listFail", { params: query });
    };
}

export default new HistoryService();
