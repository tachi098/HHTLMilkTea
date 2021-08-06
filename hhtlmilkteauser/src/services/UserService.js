import api from "./../common/APIClient";

class UserService {
    finduser = (username) => {
        return api.get(`/user/${username}`);
    };
}

export default new UserService();