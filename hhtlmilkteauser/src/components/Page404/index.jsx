import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";

const Page404 = () => {
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
    <div style={{ fontSize: "100%", lineHeight: 1.5, minHeight: "60vh" }}>
      <h3
        style={{
          textAlign: "center",
          fontSize: "12em",
          fontWeight: 100,
          margin: 0,
        }}
      >
        404
      </h3>
      <p style={{ fontSize: "2em", textAlign: "center", fontWeight: 100 }}>
        Không tìm thấy trang 😥
      </p>
    </div>
  );
};

export default Page404;
