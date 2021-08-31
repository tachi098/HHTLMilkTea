import { Document, Page, Text, Font, View, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import Logo from "./../../../../assets/img/Milktea.jpg";
import Moment from "react-moment";

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const Report = ({ listRevenue, year, sum }) => (
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
                <Text style={styles.reportTitle}>DOANH THU NĂM {year}</Text>
            </View>
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Ngày xuất: </Text>
                <Text>
                    <Moment format="yyyy-MM-DD hh:mm:ss" date={new Date()} />
                </Text>
            </View>
            <View style={styles.tableContainer}>
                <View style={styles.container}>
                    <Text style={styles.month}>Tháng</Text>
                    <Text style={styles.revenue}>Doanh thu</Text>
                </View>
            </View>

            {listRevenue.map((item, index) => (
                <View key={index}>
                    <View style={styles.row}>
                        <Text style={styles.monthItem}>{item.month}</Text>
                        {/* <Text style={styles.revenueItem}> {item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text> */}
                        <Text style={styles.revenueItem}> {item.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</Text>
                    </View>
                </View>
            ))}

            <View>
                <Text style={{ textAlign: "right", color: "#ff0000", paddingRight: "10", fontWeight: "bold", fontSize: 20 }}>
                    Tổng doanh thu: {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                </Text>
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
