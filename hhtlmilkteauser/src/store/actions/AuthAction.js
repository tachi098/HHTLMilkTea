import AuthService from "../../services/AuthService";
import { login, logout } from "../reducers/AuthReducer";

export const AuthLoginAction = (data) => async (dispatch) => {
  try {
    const res = await AuthService.login(data);
    dispatch(login(res !== undefined ? res.data : { error: 401 }));
    return res !== undefined ? res.data : { error: 401 };
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
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const AuthCheckEmailAction = (email) => async (dispatch) => {
  try {
    const res = await AuthService.checkEmail(email);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const AuthResetPassAction = (data) => async (dispatch) => {
  try {
    const res = await AuthService.updatePass(data);
    return res;
  } catch (err) {
    console.log(err);
  }
};
