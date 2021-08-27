import api from "./../common/APIClient";

class OrderService {
    add = (data, jwt) => {
        return api.post("/order", data, {
            headers: {
                authorization: jwt
            }
        });
    };
    find = (data, jwt) => {
        return api.get(`/order/${data}`, {
            headers: {
                authorization: jwt
            }
        });
    };
    udpate = (data, jwt) => {
        return api.put("/order", data, {
            headers: {
                authorization: jwt
            }
        })
    }
    delete = (id, jwt) => {
        return api.delete(`/order/${id}`, {
            headers: {
                authorization: jwt
            }
        })
    }
    checkout = (data) => {
        return api.put('/order/checkout', data)
    }
}

export default new OrderService();