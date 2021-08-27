import api from "./../common/APIClient";

class AuthService {
  login = (data) => {
    return api.post("/auth/signin", data);
  };

  register = (data) => {
    return api.post("/auth/signup", data);
  };

  logout = () => {
  };

  checkEmail = (data) => {
    return api.get(`/auth/${data.email}`);
  };

  updatePass = (data) => {
    return api.post("/auth/reset-pass", data);
  };
}

export default new AuthService();
