import api from "./../common/APIClient";

class UserService {
    finduser = (username) => {
        return api.get(`/user/${username}`);
    };
    update = (formData) => {
        return api.put("/user/updateProfile", formData);
    };
}

export default new UserService();