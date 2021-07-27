import AuthService from "../../services/AuthService";
import { login, logout } from "../reducers/AuthReducer";

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
