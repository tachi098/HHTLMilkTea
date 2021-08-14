import api from "../common/APIClient";

class SpinnerService {
  list = () => {
    return api.get("/spinner/list");
  };

  updateMark = (data) => {
    return api.put("/spinner/update-mark", data);
  };
}

export default new SpinnerService();
