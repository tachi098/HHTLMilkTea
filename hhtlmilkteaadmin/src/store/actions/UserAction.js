import { getUsers } from "./../reducers/UserReducer";
import UserService from "./../../services/UserService";

export const UserGetAll = (query) => async (dispatch) => {
  try {
    await UserService.list(query)
      .then((res) => dispatch(getUsers(res.data)))
      .catch((err) => console.error(err));
  } catch (error) {
    console.error(error);
  }
};
