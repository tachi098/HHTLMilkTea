import api from "./../common/APIClient";

class OrderService {
    listProcess = (query) => {
        return api.get("/order/listProcess", { params: query });
    };

    listSuccess = (query) => {
        return api.get("/order/listSuccess", { params: query });
    };

    listFail = (query) => {
        return api.get("/order/listFail", { params: query });
    };

    updateStatus = (data) => {
        return api.put("/order/status", data);
    };
}

export default new OrderService();
