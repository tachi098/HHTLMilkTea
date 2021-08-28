import GroupOrderService from "../../services/GroupOrderService";
import {
  getShortURLFromData,
  getShortURLEmpty,
  getGroupOrderSaveState,
  getGroupOderWithUsername,
} from "./../reducers/GroupOrderReducer";

export const GroupOrderFindAllAction = ({ username, type, orderID }) => async (
  dispatch
) => {
  try {
    await GroupOrderService.getGroupOderWithUsername({
      username,
      type,
      orderID,
    }).then((res) => dispatch(getGroupOderWithUsername(res.data)));
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID,
    });
  } catch (err) {
    console.error(err);
  }
};

export const GroupOrderShortURL = ({ longUrl }) => async (dispatch) => {
  try {
    const res = await GroupOrderService.getShortURL({ longUrl });
    dispatch(getShortURLFromData(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const GroupOrderDeleteMember = (
  { namemenber, nameOwner, orderID },
  { username, type, orderId }
) => async (dispatch) => {
  try {
    await GroupOrderService.groupOrderDeleteMember({
      namemenber,
      nameOwner,
      orderID,
    });
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID: orderId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const GroupOrderDeleteGroupMembersAction = (
  { usernameOwner, orderIdOwner },
  { username, type, orderID },
  longUrl
) => async (dispatch) => {
  try {
    await GroupOrderService.groupOrderDeleteGroupMembers({
      usernameOwner,
      orderIdOwner,
    });
    const res = await GroupOrderService.groupORderDeleteShareLink(longUrl);
    dispatch(getShortURLEmpty(res.data));
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID: orderID,
    });
  } catch (error) {
    console.error(error);
  }
};

export const GroupOrderCreateMemberAction = (data) => async (dispatch) => {
  try {
    const res = await GroupOrderService.groupOrderCreateMember(data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const GroupOrderAddAction = (
  data,
  { username, type, orderID }
) => async (dispatch) => {
  try {
    await GroupOrderService.groupOrderCreateMemberAdd(data);
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID,
    });
  } catch (error) {
    console.error(error);
  }
};

export const GroupOrderUpdateQuantity = (
  data,
  { username, type, orderID }
) => async (dispatch) => {
  try {
    await GroupOrderService.groupOrderCreateMemberUpdateQuantity(data);
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID,
    });
  } catch (error) {
    console.error(error);
  }
};

export const GroupOrderDetailsDelete = (
  id,
  { username, type, orderID }
) => async (dispatch) => {
  try {
    await GroupOrderService.groupOrderDetialsDelete(id);
    await GroupOrderService.getGroupOderWithUsernameWS({
      username,
      type,
      orderID,
    });
  } catch (error) {
    console.error(error);
  }
};

export const GroupOrderSaveStateAction = (data) => async (dispatch) => {
  try {
    dispatch(getGroupOrderSaveState(data));
  } catch (error) {
    console.error(error);
  }
};
