import {
  Document,
  Page,
  Text,
  Font,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import Logo from "./../../../../assets/img/Milktea.jpg";
import Moment from "react-moment";
// import { styles } from "./style";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 100,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  wrapInfo: {
    display: "flex",
    flexDirection: "row",
  },
  wrapAvatarInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  fullName: {
    fontSize: 16,
    fontWeight: 900,
    marginTop: 10,
  },
  avatar: {
    border: "3px solid #000",
    borderRadius: "50%",
    width: 100,
    height: 100,
  },
  wrapDate: {
    marginTop: 30,
    marginBottom: 30,
  },
  mark: {
    color: "red",
    marginTop: 5,
  },
  wrapField: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
  },
});

const Report = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <Image style={styles.logo} src={Logo} />
      <View style={styles.wrapDate}>
        <Text>Ngày xuất: </Text>
        <Text>
          <Moment format="DD/MM/YYYY HH:mm:ss" date={new Date()} />
        </Text>
      </View>
      <View style={styles.wrapInfo}>
        <View style={styles.wrapAvatarInfo}>
          <Image src={user?.linkImage} style={styles.avatar} />
          <Text style={styles.fullName}>{user?.fullName}</Text>
          <Text style={styles.mark}>Điểm: {user?.memberVip?.mark ?? "0"}</Text>
        </View>
        <View>
          <View style={styles.wrapField}>
            <Text>Ngày sinh: </Text>
            <Text>
              {<Moment format="DD/MM/YYYY" date={user?.birthday} /> && (
                <Moment format="DD/MM/YYYY" date={new Date()} />
              )}
            </Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Địa chỉ: </Text>
            <Text>{user?.address}</Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Điện thoại: </Text>
            <Text>{user?.phone}</Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Email: </Text>
            <Text>{user?.email}</Text>
          </View>
          <View style={styles.wrapField}>
            <Text>Tham gia: </Text>
            <Text>
              {<Moment format="DD/MM/YYYY HH:mm:ss" date={user?.createdAt} />}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <hr style={{ marginTop: 50, height: 1, backgroundColor: "#006E4E" }} />
        <Text style={{ textAlign: "center", color: "#006E4E" }}>
          HHTLMilktea
        </Text>
      </View>
    </Page>
  </Document>
);

export default Report;