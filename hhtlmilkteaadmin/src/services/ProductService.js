import api from "./../common/APIClient";

class ProductService {
    list = (query) => {
        return api.get("/product/list", { params: query });
    };
    add = (formData) => {
        return api.post("/product", formData);
    };
}

export default new ProductService();