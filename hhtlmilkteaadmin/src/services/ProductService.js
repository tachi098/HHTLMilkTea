import api from "./../common/APIClient";

class ProductService {
    list = (query) => {
        return api.get("/product/list", { params: query });
    };
    add = (formData) => {
        return api.post("/product", formData);
    };
    update = (formData) => {
        return api.put("/product", formData);
    };
    delete = (id) => {
        return api.put(`/product/${id}`);
    }
    showSaleOff = (query) => {
        return api.get("/product/saleoff", { params: query });
    };
    showSaleOffProduct = (query) => {
        return api.get("/product/saleoff?saleOff=add", { params: query });
    };
}

export default new ProductService();