import api from "./../common/APIClient";

class VoucherService {
  list = (username) => {
    return api.get(`/voucher/list/${username}`);
  };

  checkCode = (data) => {
    return api.put("/voucher/check-code", data);
  };
}

export default new VoucherService();
