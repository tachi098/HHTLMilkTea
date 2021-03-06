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
import JsBarcode from "jsbarcode"

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
    width: 70,
    height: 70,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 25,
  },
  reportTitle: {
    color: "#006E4E",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerContainer: {
    marginLeft: 40,
  },
});

const Report = ({ product }) => {

  let canvas;
  canvas = document.createElement('canvas');
  JsBarcode(canvas, product.id);
  const qr = canvas.toDataURL();

  return (
    <Document >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Image style={styles.logo} src={Logo} />
          <View style={styles.headerContainer}>
            <Text>
              ?????a ch???: 590 C??ch M???ng Th??ng T??m, Ph?????ng 11, Qu???n 3, Th??nh ph??? H??? Ch??
              Minh
            </Text>
            <Text>S??? ??i???n tho???i: + 028 3846 0846</Text>
            <Text>Email: fptaptech@gmail.com</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Th??ng tin s???n ph???m</Text>
        </View>
        <View style={styles.wrapDate}>
          <Text>Ng??y xu???t: </Text>
          <Text>
            <Moment format="DD/MM/YYYY HH:mm:ss" date={new Date()} />
          </Text>
        </View>
        <View style={styles.wrapInfo}>
          <View style={styles.wrapAvatarInfo}>
            <Image src={product?.linkImage} />
          </View>
          <View>
            <View style={styles.wrapField}>
              <Text>T??n s???n ph???m: </Text>
              <Text>
                {
                  product?.name
                }
              </Text>
            </View>
            <View style={styles.wrapField}>
              <Text>Gi??: </Text>
              <Text>{product?.price}</Text>
            </View>
            <View style={styles.wrapField}>
              <Text>N???i dung: </Text>
              <Text>{product?.title}</Text>
            </View>
            <View style={styles.wrapField}>
              <Text>Lo???i s???n ph???m: </Text>
              <Text>{product?.categoryId?.name}</Text>
            </View>
            <View style={styles.wrapField}>
              <Text>M?? s???n ph???m: </Text>
              <Image src={qr} style={{ width: 120, height: 60 }} />
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
    </Document >
  )
}

export default Report;
