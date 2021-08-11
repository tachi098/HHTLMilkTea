import api from "./../common/APIClient";

class CategoryService {
    list = () => {
        return api.get("/category/fill");
    };
}

export default new CategoryService();