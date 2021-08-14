import SpinnerService from "./../../services/SpinnerService";
import { findByAll } from "./../reducers/SpinnerReducer";
import { userbyusername } from "./../reducers/UserReducer";

export const SpinnerFindByAllAction = () => async (dispatch) => {
  try {
    const res = await SpinnerService.list(findByAll());
    dispatch(findByAll(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const SpinnerUpdateMarkAction = (data) => async (dispatch) => {
  try {
    const res = await SpinnerService.updateMark(data);
    dispatch(userbyusername(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
