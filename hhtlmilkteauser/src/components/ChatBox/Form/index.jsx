import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { ChatBotListAction } from "../../../store/actions/ChatBotAction";
import { Chip } from "@material-ui/core";

const Form = ({ steps }) => {
  const [order, setOrder] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ChatBotListAction(steps.search.value)).then(
      (res) => res?.data && setOrder(res?.data)
    );
  }, [dispatch, steps.search.value]);

  return (
    <React.Fragment>
      {order ? (
        <div style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <b>Thông Tin Đơn Hàng</b>
          </div>

          <div>
            <p>
              <b>Ngày Đặt Hàng: </b>
              {moment(order.updatedAt).format("YYYY-MM-DD")}
            </p>
          </div>

          <div style={{ display: "flex", marginBottom: 10 }}>
            <b style={{ marginRight: 4 }}>Phương thức Thanh Toán: </b>
            <span>
              {order.payment === 1 && <span>Tiền mặt</span>}
              {order.payment === 2 && <span>Trực tuyến</span>}
            </span>
          </div>

          <div style={{ display: "flex" }}>
            <b style={{ marginRight: 4 }}>Tổng Tiền: </b>
            <span>
              {order.totalPrice.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>

          <div style={{ display: "flex" }}>
            <p>
              <b>Trạng thái: </b>
            </p>
            {order.status === 1 && (
              <Chip
                label="Đang xử lý"
                style={{
                  backgroundColor: "#ded531",
                  color: "white",
                  marginTop: 8,
                  marginLeft: 4,
                }}
              />
            )}
            {order.status === 2 && (
              <Chip
                label="Đang giao hàng"
                style={{
                  backgroundColor: "#2e45a3",
                  color: "white",
                  marginTop: 8,
                  marginLeft: 4,
                }}
              />
            )}
            {order.status === 3 && (
              <Chip
                label="Hoàn thành"
                style={{
                  backgroundColor: "#21943d",
                  color: "white",
                  marginTop: 8,
                  marginLeft: 4,
                }}
              />
            )}
            {order.status === 4 && (
              <Chip
                label="Đã hủy"
                style={{
                  backgroundColor: "#d44a2f",
                  color: "white",
                  marginTop: 8,
                  marginLeft: 4,
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <h3 style={{ color: "red" }}>Không tìm thấy đơn hàng</h3>
      )}
    </React.Fragment>
  );
};

export default Form;
