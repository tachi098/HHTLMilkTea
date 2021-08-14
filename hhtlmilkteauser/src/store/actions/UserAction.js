import UserService from "../../services/UserService";
import WishlistService from "../../services/WishlistService";
import {
  userbyusername, profileUpdate, updateWishlist, deleteProductWishlist
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

    await UserService.update(formData)
      .then(res => dispatch(profileUpdate(res.data)))
      .catch(err => console.error(err));
  } catch (e) {
    return console.error(e);
  }
};

export const udpateWishlist = (data) => async (dispatch) => {
  try {
    await WishlistService.add(data)
      .then((response) =>
        dispatch(updateWishlist(response.data))
      )
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export const deleteWishlist = (data) => async (dispatch) => {
  try {
    await WishlistService.update(data)
      .then((response) =>
        dispatch(deleteProductWishlist(response.data))
      )
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};