import api from "./../common/APIClient";

class VoucherService {
  list = () => {
    return api.get("/voucher/list");
  };

  checkCode = (data) => {
    return api.put("/voucher/check-code", data);
  };
}

export default new VoucherService();
