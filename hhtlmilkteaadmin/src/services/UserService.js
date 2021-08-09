import api from "./../common/APIClient";

class UserService {
  list = (query) => {
    return api.get("/user/list", { params: query });
  };

  updateStatus = (data) => {
    return api.put("/user/status", data);
  };
}

export default new UserService();
