import api from "./../common/APIClient";

class CategoryService {
    list = () => {
        return api.get("/category/list");
    };
    page = (query) => {
        return api.get("/category/page", { params: query });
    }
    add = (data) => {
        return api.post("/category/add", data);
    };
    update = (data) => {
        return api.put("/category/edit", data);
    };
    delete = (id) => {
        return api.put(`/category/delete/${id}`);
    }
}

export default new CategoryService();