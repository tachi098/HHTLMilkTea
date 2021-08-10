import UserService from "../../services/UserService";
import {
  userbyusername, profileUpdate
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

export const updateProfile = (data) => async (dispatch) => {
  try {

    console.log(data);

    const formData = new FormData();
    formData.append("username", data.username)
    if (data.multipartFile) {
      formData.append("multipartFile", data.multipartFile);
    }
    formData.append("fullName", data.fullName);
    formData.append("birthday", data.birthday);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("email", data.email);

    await UserService.update(formData)
      .then(res => dispatch(profileUpdate(res.data)))
      .catch(err => console.error(err));
  } catch (e) {
    return console.error(e);
  }
};
