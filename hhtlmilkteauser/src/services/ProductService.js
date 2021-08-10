import api from "../common/APIClient"

class ProductService {
    list = (query) => {
        return api.get("/product", { params: query })
    }
}

export default new ProductService();