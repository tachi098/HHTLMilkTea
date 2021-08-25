import GroupOrderService from "../../services/GroupOrderService";
import OrderService from "../../services/OrderService";
import { profileuser } from "../reducers/UserReducer";
import {
  add,
  find,
  update,
  deleteOrderDetail,
  checkoutSuccess,
} from "./../reducers/OrderReducer";

export const OrderAddAction = (data, { username, type, orderID }) => async (
  dispatch
) => {
  try {
    await OrderService.add(data)
      .then((response) => dispatch(add(response.data)))
      .catch((error) => console.error(error));
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID,
    });
  } catch (error) {
    console.error(error);
  }
};

export const OrderFindAction = (data) => async (dispatch) => {
  try {
    await OrderService.find(data)
      .then((response) => dispatch(find(response.data)))
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export const OrderUpdateQuantity = (
  data,
  { username, type, orderID }
) => async (dispatch) => {
  try {
    await OrderService.udpate(data)
      .then((response) => dispatch(update(response.data)))
      .catch((error) => console.error(error));
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID,
    });
  } catch (error) {
    console.error(error);
  }
};

export const OrderDelteOrderDetail = (
  id,
  { username, type, orderID }
) => async (dispatch) => {
  try {
    await OrderService.delete(id)
      .then((response) => dispatch(deleteOrderDetail(response.data)))
      .catch((error) => console.error(error));
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID,
    });
  } catch (error) {
    console.error(error);
  }
};

export const checkoutOrder = (data) => async (dispatch) => {
  try {
    // alert(JSON.stringify(data));

    if (!localStorage.getItem("group")) {
      data.team = false;
    } else {
      data.team = true;
    }

    const res = await OrderService.checkout(data);
    dispatch(checkoutSuccess(res.data));
    dispatch(profileuser(res.data));
    return res;
  } catch (error) {
    console.error(error);
  }
};
