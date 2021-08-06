import UserService from "../../services/UserService";
import {
  userbyusername
} from "../reducers/UserReducer";

export const UserFindByUsernameAction = (query) => async (dispatch) => {
  try {
    await UserService.finduser(query)
      .then((response) =>
        dispatch(userbyusername(response.data))
      )
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};