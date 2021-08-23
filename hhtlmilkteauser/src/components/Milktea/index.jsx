import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";
import Content from "./Content";
import Header from "./Header";

const Milktea = () => {
  //support group member
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !Object.is(localStorage.getItem("member", null)) &&
      !Object.is(localStorage.getItem("member"), null)
    ) {
      setTimeout(() => {
        const groupMember = JSON.parse(localStorage.getItem("groupMember"));
        const username = groupMember?.username;
        const type = "team";
        const orderID = groupMember?.orderID;
        GroupOrderFindAllAction({ username, type, orderID })(dispatch);
      }, 750);
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Content />
    </React.Fragment>
  );
};

export default Milktea;
