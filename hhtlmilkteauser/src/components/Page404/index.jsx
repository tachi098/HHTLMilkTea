import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";

const Page404 = () => {
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
    <div style={{ fontSize: "100%", lineHeight: 1.5 }}>
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
