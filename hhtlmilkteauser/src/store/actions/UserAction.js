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

export const updateProfile = (data) => async (dispatch) => {
  try {
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
    formData.append("postcode", data.postcode);


    await UserService.update(formData);
    //const res = await UserService.update(formData);

    //dispatch(profileUpdate(res.data));
  } catch (e) {
    return console.error(e);
  }
};
