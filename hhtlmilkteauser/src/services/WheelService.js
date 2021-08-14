import api from "./../common/APIClient";

class WheelService {
  list = () => {
    return api.get("/wheel/list");
  };

  save = (data) => {
    return api.post("/wheel/wheel-save", data);
  };
}

export default new WheelService();
