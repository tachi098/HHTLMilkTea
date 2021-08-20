import { BASE_URL_V2 } from "../common/Constant";
import api from "./../common/APIClient";

class GroupOrderService {
  getGroupOderWithUsername = ({ username, type, orderID }) => {
    return api.get(`/grouporder/${username}/${type}/${orderID}`);
  };

  getGroupOderWithUsernameWS = ({ username, type, orderID }) => {
    return api.post("/grouporder/GroupOderWithUsernameWS", {
      username,
      type,
      orderID,
    });
  };

  getShortURL = ({ longUrl }) => {
    return api.post(
      "/shared/shorter",
      { longUrl },
      {
        baseURL: BASE_URL_V2,
      }
    );
  };
}

export default new GroupOrderService();
