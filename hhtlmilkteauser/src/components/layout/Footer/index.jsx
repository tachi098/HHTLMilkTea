import { Grid, Typography } from "@material-ui/core"
import GoogleMap from "../../../common/GoogleMap"

const Footer = () => {
    return (
        <Grid container style={{ paddingTop: 10, paddingBottom: 5, backgroundColor: '#416c48', color: 'white', minHeight: "calc(100vh - 577px)" }}>
            <Grid item xs={12} md={8} style={{ paddingLeft: 20 + 'px' }}>
                <Typography>
                    <b>Trụ sở chính: </b>
                    Công ty CP Phúc Long Heritage - ĐKKD: 0316 871719
                    do sở KHĐT TPHCM cấp lần đầu ngày 21/05/2021
                </Typography>
                <Typography>
                    <b>Nhà máy: </b>
                    D_8D_CN Đường XE 1, Khu Công Nghiệp Mỹ Phước III, phường Mỹ Phước, thị xã Bến Cát, tỉnh Bình Dương, Việt Nam
                </Typography>
                <Typography>
                    <b>Địa chỉ: </b>
                    42/24 - 42/26 Đường 643 Tạ Quang Bửu, phường 4, quận 8, Hồ Chí Minh
                </Typography>
                <Typography>
                    <b>Điện thoại: </b>
                    028 6263 0377 - 6263 0378
                </Typography>
                <Typography>
                    <b>Email: </b>
                    Info@phuclong.com.vn
                </Typography>
            </Grid>

            <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleMap />
            </Grid>
        </Grid>
    )
}

export default Footer