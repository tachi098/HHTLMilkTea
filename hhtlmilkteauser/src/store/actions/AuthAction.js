import AuthService from "../../services/AuthService";
import { login, logout, register } from "../reducers/AuthReducer";

export const AuthLoginAction = (data) => async (dispatch) => {
  try {
    await AuthService.login(data)
      .then((response) =>
        dispatch(login(response !== undefined ? response.data : { error: 401 }))
      )
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export const AuthLogoutAction = () => (dispatch) => {
  AuthService.logout();
  dispatch(logout());
};

export const AuthRegisterAction = (data) => async (dispatch) => {
  try {
    const res = await AuthService.register(data);
    dispatch(register(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
