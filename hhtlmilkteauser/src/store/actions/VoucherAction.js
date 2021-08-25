import VoucherService from "./../../services/VoucherService";
import { list } from "./../reducers/VoucherReducer";
import { userbyusername } from "./../reducers/UserReducer";

export const VoucherListAction = (username) => async (dispatch) => {
  try {
    const res = await VoucherService.list(username);
    dispatch(list(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const VoucherCheckCodeAction = (data) => async (dispatch) => {
  try {
    const res = await VoucherService.checkCode(data);
    // console.log(res);
    if (Object.is(res.data.message, "Mã được sử dụng thành công")) {
      dispatch(userbyusername(res.data));
      dispatch(list(res.data.codes));
    }
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
