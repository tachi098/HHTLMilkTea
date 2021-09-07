import api from "./../common/APIClient";

class SaleOffService {
    list = () => {
        return api.get("/saleoff/list");
    };
    add = (data) => {
        return api.post("/saleoff/add", data);
    };
    delete = (id) => {
        return api.delete(`/saleoff/delete/${id}`);
    }
}

export default new SaleOffService();