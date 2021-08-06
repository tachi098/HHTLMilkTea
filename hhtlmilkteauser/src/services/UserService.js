import api from "./../common/APIClient";

class UserService {
    finduser = (query) => {
        return api.get("/user", {
            params: query
        });
    };
}

export default new UserService();