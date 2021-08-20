import GroupOrderService from "../../services/GroupOrderService";
import {
  // getGroupOderWithUsername,
  getShortURLFromData,
} from "./../reducers/GroupOrderReducer";

export const GroupOrderFindAllAction =
  ({ username, type, orderID }) =>
  async (dispatch) => {
    try {
      await GroupOrderService.getGroupOderWithUsernameWS({
        username,
        type,
        orderID,
      });
      // const res = await GroupOrderService.getGroupOderWithUsername({
      //   username,
      //   type,
      //   orderID,
      // });
      // dispatch(
      //   getGroupOderWithUsername(!Object.is(res, undefined) ? res.data : {})
      // );
      // return !Object.is(res, undefined) ? res.data : {};
    } catch (err) {
      console.error(err);
    }
  };

export const GroupOrderShortURL =
  ({ longUrl }) =>
  async (dispatch) => {
    try {
      const res = await GroupOrderService.getShortURL({ longUrl });
      dispatch(getShortURLFromData(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
