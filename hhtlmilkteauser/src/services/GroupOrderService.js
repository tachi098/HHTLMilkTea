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

  groupOrderDeleteMember = ({ namemenber, nameOwner, orderID }) => {
    return api.delete(`/grouporder/${namemenber}/${nameOwner}/${orderID}`);
  };

  groupOrderDeleteGroupMembers = ({ usernameOwner, orderIdOwner }) => {
    return api.delete(`/grouporder/${usernameOwner}/${orderIdOwner}`);
  };

  groupORderDeleteShareLink = (longUrl) => {
    return api.delete(`/grouporder/${longUrl}`);
  };

  groupOrderCreateMember = (data) => {
    return api.post("/grouporder/create-member", data);
  };

  groupOrderCreateMemberAdd = (data) => {
    return api.post("/grouporder/create-orderDetails", data);
  };

  groupOrderCreateMemberUpdateQuantity = (data) => {
    return api.put("/grouporder/update-orderDetails-quantity", data);
  };

  groupOrderDetialsDelete = (id) => {
    return api.delete(`/grouporder/delete/${id}`);
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
