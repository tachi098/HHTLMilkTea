import api from "./../common/APIClient";

class UserService {
  list = (query) => {
    return api.get("/user/list", { params: query });
  };
}

export default new UserService();
