import api from "./../common/APIClient";

class SaleOffService {
    list = () => {
        return api.get("/saleoff/list");
    };
    page = (query) => {
        return api.get("/saleoff/page", { params: query });
    }
    add = (data) => {
        return api.post("/saleoff/add", data);
    };
    delete = (id) => {
        return api.delete(`/saleoff/delete/${id}`);
    }
}

export default new SaleOffService();