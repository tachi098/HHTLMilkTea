import SpinnerService from "./../../services/SpinnerService";
import { findAll, save, remove } from "./../reducers/SpinnerReducer";

export const SpinnerListAction = () => async (dispatch) => {
  try {
    await SpinnerService.list()
      .then((response) => dispatch(findAll(response.data)))
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export const SpinnerSaveAction = (data) => async (dispatch) => {
  try {
    await SpinnerService.insert(data)
      .then((response) => dispatch(save(response.data)))
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export const SpinnerRemoveAction = (data) => async (dispatch) => {
  try {
    await SpinnerService.remove(data)
      .then((response) => dispatch(remove(data)))
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};
