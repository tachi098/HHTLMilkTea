import api from "./../common/APIClient";

class CategoryService {
    list = () => {
        return api.get("/category/list");
    };
}

export default new CategoryService();