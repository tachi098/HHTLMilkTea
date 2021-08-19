import api from "./../common/APIClient";

class GroupOrderService {
  getGroupOderWithUsername = ({ username, type }) => {
    return api.get(`/grouporder/${username}/${type}`);
  };

  getGroupOderWithUsernameWS = ({ username, type }) => {
    return api.post("/grouporder/GroupOderWithUsernameWS", { username, type });
  };
}

export default new GroupOrderService();
