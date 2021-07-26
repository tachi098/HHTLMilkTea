import api from "./../common/APIClient";

class SpinnerService {
  list = () => {
    return api.get("/spinner/list");
  };

  insert = (data) => {
    return api.post("/spinner/insert", data);
  };

  remove = (id) => {
    return api.delete(`/spinner/delete/${id}`);
  };
}

export default new SpinnerService();
