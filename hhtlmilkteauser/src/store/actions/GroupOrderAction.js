import GroupOrderService from "../../services/GroupOrderService";
import { getGroupOderWithUsername } from "./../reducers/GroupOrderReducer";

export const GroupOrderFindAllAction =
  ({ username, type }) =>
  async (dispatch) => {
    try {
      // await GroupOrderService.getGroupOderWithUsernameWS({ username, type });
      const res = await GroupOrderService.getGroupOderWithUsername({
        username,
        type,
      });
      dispatch(
        getGroupOderWithUsername(!Object.is(res, undefined) ? res.data : {})
      );
      return !Object.is(res, undefined) ? res.data : {};
    } catch (err) {
      console.error(err);
    }
  };
