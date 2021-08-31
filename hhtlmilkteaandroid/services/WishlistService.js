import api from "./../common/APIClient";

class WishlistService {
    find = (username, jwt) => {
        return api.get(`/wishlist/${username}`, {
            headers: {
                authorization: jwt
            }
        });
    };
    add = (data, jwt) => {
        return api.post("/wishlist", data, {
            headers: {
                authorization: jwt
            }
        })
    }
    update = (data, jwt) => {
        return api.put("/wishlist", data, {
            headers: {
                authorization: jwt
            }
        })
    }
}

export default new WishlistService();