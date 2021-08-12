import api from "./../common/APIClient";

class OrderService {
    add = (data) => {
        return api.post("/order", data);
    };
    find = (data) => {
        return api.get(`/order/${data}`);
    };
}

export default new OrderService();