import WheelService from "../../services/WheelService";
import { findAll } from "./../reducers/WheelReducer";
import { userbyusername } from "./../reducers/UserReducer";

export const WheelListAction = () => async (dispatch) => {
  try {
    const res = await WheelService.list();
    dispatch(findAll(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const WheelCreateAction = (data) => async (dispatch) => {
  try {
    const res = await WheelService.save(data);
    dispatch(userbyusername(res.data));
    dispatch(findAll(res.data));
  } catch (err) {
    console.error(err);
  }
};
