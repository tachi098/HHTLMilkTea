import { Document, Page, Text, Font, View, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import Logo from "./../../../../assets/img/Milktea.jpg";
import Moment from "react-moment";
import JsBarcode from "jsbarcode"

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});



const Report = ({ order }) => {

  let canvas;
  canvas = document.createElement('canvas');
  JsBarcode(canvas, order.id);
  const qr = canvas.toDataURL();

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Image style={styles.logo} src={Logo} />
          <View style={styles.headerContainer}>
            <Text>
              Địa chỉ: 590 Cách Mạng Tháng Tám, Phường 11, Quận 3, Thành phố Hồ Chí
              Minh
            </Text>
            <Text>Số điện thoại: + 028 3846 0846</Text>
            <Text>Email: fptaptech@gmail.com</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Danh sách Loại Sản Phẩm</Text>
        </View>
        <View>
          <Text style={styles.reportTitle}>{order.name}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Ngày xuất: </Text>
          <Text>
            <Moment format="yyyy-MM-DD hh:mm:ss" date={new Date()} />
          </Text>
        </View>

        <View>
          <Text>Mã đơn hàng:</Text>
          <Image src={qr} style={{ width: 120, height: 60 }} />
          <Text>Ngày đặt hàng: <Moment format="yyyy-MM-DD hh:mm:ss" date={order.createdAt} /></Text>
          <Text>Người đặt hàng: {order.userId.fullName}</Text>
          <Text>Địa chỉ: {order.address}</Text>
          <Text>Số điện thoại: {order.phone}</Text>
          <Text>Lưu ý thêm: {order.noteOrder ? order.noteOrder : "Không có lưu ý"}</Text>
          <Text>Phương thức thanh toán: {order.payment === 1 ? "Thanh toán khi nhận hàng" : "Thánh toán trực tuyến"}</Text>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.container}>
            <Text style={styles.img}>Hình Ảnh</Text>
            <Text style={styles.name}>Tên Sản Phẩm</Text>
            <Text style={styles.price}>Giá</Text>
            <Text style={styles.name}>Số lượng</Text>
            <Text style={styles.name}>Tổng</Text>
          </View>
        </View>

        {order?.orderDetails.map((item, index) => (
          <View key={index}>
            <View style={styles.row}>
              <Text style={styles.img}>
                <Image
                  style={{ width: 30, height: 20 }}
                  src={item.product.linkImage ?? Logo}
                />
              </Text>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.price}>{item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
              <Text style={styles.price}>{item.quantity}</Text>
              <Text style={styles.price}>{(item.quantity * item.product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
            </View>
          </View>
        ))}

        <View style={{ marginTop: 20 }}>
          <Text>Tạm tính: {((order.totalPrice - order.shipping + order.memberVip) / 1.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
          <Text>Thuế (5%): {((order.totalPrice - order.shipping + order.memberVip) / 1.05 * 0.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
          <Text>Phí vận chuyển: {order.shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
          <Text>Giảm giá: {order.memberVip.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
          <Text>Tổng tiền thanh toán: {(order.totalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</Text>
        </View>

        <View>
          <hr style={{ marginTop: 50, height: 1, backgroundColor: "#006E4E" }} />
          <Text style={{ textAlign: "center", color: "#006E4E" }}>
            HHTLMilktea
          </Text>
        </View>
      </Page>
    </Document>
  )
};

export default Report;
