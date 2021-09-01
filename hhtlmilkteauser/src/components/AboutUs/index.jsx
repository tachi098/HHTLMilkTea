import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";
import Content from "./Content";
import Header from "./Header";

const AboutUs = () => {
  //support group member
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    if (
      order &&
      Object.keys(order).length !== 0 &&
      order.constructor === Object
    ) {
      if (
        (!Object.is(localStorage.getItem("member", null)) &&
          !Object.is(localStorage.getItem("member"), null)) ||
        localStorage.getItem("user")
      ) {
        setTimeout(() => {
          const groupMember = JSON.parse(localStorage.getItem("groupMember"));
          const username = groupMember?.username;
          const type = "team";
          const orderID = groupMember?.orderID;
          GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        }, 500);
      }

      if (auth?.user?.token) {
        setTimeout(() => {
          const username = auth?.user?.username;
          const type = "team";
          const orderID = order?.id;
          GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        }, 500);
      }
    }
  }, [auth?.user?.token, auth?.user?.username, dispatch, order, order?.id]);

  return (
    <React.Fragment>
      <Header />
      <Content />
    </React.Fragment>
  );
};

export default AboutUs;
