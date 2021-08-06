import { Document, Page, Text, Font, View, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import Logo from "./../../../assets/img/Milktea.jpg";
import Moment from "react-moment";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const Report = ({ users }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <Image style={styles.logo} src={Logo} />
      <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Danh sách người dùng</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Ngày xuất: </Text>
        <Text>
          <Moment format="yyyy-MM-DD hh:mm:ss" date={new Date()} />
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Text>
          Địa chỉ: 590 Cách Mạng Tháng Tám, Phường 11, Quận 3, Thành phố Hồ Chí
          Minh
        </Text>
        <Text>Số điện thoại: + 028 3846 0846</Text>
        <Text>Email: fptaptech@gmail.com</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.container}>
          <Text style={styles.img}>Hình Ảnh</Text>
          <Text style={styles.username}>Tài Khoản</Text>
          <Text style={styles.fullName}>Họ & Tên</Text>
          <Text style={styles.phone}>Số Điện Thoại</Text>
          <Text style={styles.email}>Email</Text>
        </View>
      </View>

      {users.map((item, index) => (
        <View key={index}>
          <View style={styles.row}>
            <Text style={styles.img}>
              <Image
                style={{ width: 30, height: 20 }}
                src={item.linkImage ?? Logo}
              />
            </Text>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.fullName}>{item.fullName}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>
      ))}
      <View>
        <hr style={{ marginTop: 50, height: 1, backgroundColor: "#000" }} />
      </View>
    </Page>
  </Document>
);

export default Report;
