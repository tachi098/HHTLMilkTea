import api from "./../common/APIClient";

class OrderService {
    add = (data) => {
        return api.post("/order", data);
    };
    find = (data) => {
        return api.get(`/order/${data}`);
    };
    udpate = (data) => {
        return api.put("/order", data)
    }
    delete = (id) => {
        return api.delete(`/order/${id}`)
    }
}

export default new OrderService();