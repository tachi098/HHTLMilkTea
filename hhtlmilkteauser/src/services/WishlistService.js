import api from "../common/APIClient"

class WishlistService {
    add = (data) => {
        return api.post("/wishlist", data)
    }
    update = (data) => {
        return api.put("/wishlist", data)
    }
}

export default new WishlistService();