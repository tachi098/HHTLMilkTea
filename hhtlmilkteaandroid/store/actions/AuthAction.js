import AuthService from "../../services/AuthService";
import { login, logout } from "../reducers/AuthReducer";
import { logoutOrder } from "../reducers/OrderReducer";

export const AuthLoginAction = (data) => async (dispatch) => {
  try {
    if (Object.is(data.username, "admin")) {
      data.username = "hhtlmilktea";
    }
    const res = await AuthService.login(data);
    dispatch(login(res !== undefined ? res.data : { error: 401 }));
    return res !== undefined ? res.data : { error: 401 };
  } catch (error) {
    console.error(error);
  }
};

export const AuthLogoutAction = () => async (dispatch) => {
  try {
    dispatch(await logout());
    dispatch(logoutOrder());
    return "logout";
  } catch (err) {
    console.error(err);
  }
};

