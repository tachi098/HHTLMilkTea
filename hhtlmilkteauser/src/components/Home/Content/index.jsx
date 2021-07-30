import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import content1 from './../../../assets/img/content1.jpg';
import content2 from './../../../assets/img/content2.jpg';
import content3 from './../../../assets/img/content3.jpg';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    btnOrder: {
        color: "#0c713d",
        fontSize: 16,
        border: '1px solid',
        paddingRight: 10,
        paddingLeft: 10,
        '&:hover': {
            backgroundColor: '#0c713d',
            color: 'white'
        }
    }
});

const Content = () => {
    const classes = useStyles();

    return (
        <div style={{ paddingLeft: 30 + 'px', paddingRight: 30 + 'px', backgroundColor: '#ffffff' }}>

            {/* Content 1 */}
            <Grid item xs={12} md={12} style={{ paddingTop: 40 + 'px' }}>
                <Card className={classes.card} style={{ boxShadow: 'none' }}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                TỪ NHỮNG MẦM TRÀ, CHÚNG TÔI TẠO RA NIỀM ĐAM MÊ
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                Trải qua hơn 50 năm chắt chiu tinh hoa từ những búp trà xanh và hạt cà phê thượng hạng cùng mong muốn mang lại cho khách hàng những trải nghiệm giá trị nhất khi thưởng thức, Phúc Long liên tục là thương hiệu tiên phong với nhiều ý tưởng sáng tạo đi đầu trong ngành trà và cà phê.
                                Chúng tôi tin rằng từng sản phẩm trà và cà phê sẽ càng thêm hảo hạng khi được tạo ra từ sự phấn đấu không ngừng cùng niềm đam mê. Và chính kết nối dựa trên niềm tin, sự trung thực và tin yêu sẽ góp phần mang đến những nét đẹp trong văn hóa thưởng trà và cà phê ngày càng bay cao, vươn xa.
                            </Typography>
                            <Button size="small" color="primary" className={classes.btnOrder}>
                                Xem thêm
                            </Button>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={content1} title="bannertrangchu" style={{ width: 500 + 'px' }} />
                    </Hidden>
                </Card>
            </Grid>

            {/* Content 2 */}
            <Grid item xs={12} md={12} style={{ paddingTop: 80 + 'px' }}>
                <Card className={classes.card} style={{ boxShadow: 'none' }}>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={content2} title="bannertrangchu" style={{ width: 500 + 'px' }} />
                    </Hidden>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                PHÚC LONG KIOSK CHÍNH THỨC PHỤC VỤ TẠI QUẬN 3 VÀ QUẬN 7
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                Bên cạnh 3 Kiosk mới đi vào phục vụ chính thức tại Quận 8, Phúc Long tiếp tục mở rộng mô hình Phúc Long Kiosk nhanh, tiện, hiện đại, chất lượng đến Quận 3 và Quận 7 kể từ ngày 30.06.2021.
                                Giờ đây, Khách hàng dễ dàng thưởng thức vị trà – cà phê Phúc Long truyền thống tại các cửa hàng VinMar
                                Đặc biệt, Khách hàng ghé thăm Phúc Long tại những địa điểm khai trương sẽ nhận được những món quà cực hấp dẫn:

                                Sổ tay Phúc Long cao cấp
                                Bình thể thao Phúc Long tiện lợi
                                Móc khóa Barista Phúc Long xinh xắn
                            </Typography>
                            <Button size="small" color="primary" className={classes.btnOrder}>
                                Xem thêm
                            </Button>
                        </CardContent>
                    </div>
                </Card>
            </Grid>

            {/* Content 3 */}
            <Grid item xs={12} md={12} style={{ paddingTop: 80 + 'px' }}>
                <Card className={classes.card} style={{ boxShadow: 'none' }}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                MUA 1 TẶNG 1 - CAFÉ PHÚC LONG THƠM NGON - ĐẬM VỊ
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                Ưu đãi "Mua 1 Tặng 1": Miễn phí 1 ly Café đen hoặc Sữa nóng hoặc đá (size Vừa) khi mua 1 ly Café size Lớn thuộc nhóm Traditional Coffee và Classic Coffee.
                                Thời gian áp dụng ưu đãi:
                                - Áp dụng cả ngày từ 22 - 29.04.2021
                                - Từ 7-10h sáng mỗi ngày từ 04.05 - 13.06.2021
                                Địa điểm áp dụng:
                                - Toàn bộ hệ thống cửa hàng Phúc Long trên toàn quốc trừ Phúc Long Tân Sơn Nhất.
                                - Kênh đặt hàng Free Delivery 1800 6779.
                                - Ứng dụng đặt hàng công nghệ.
                            </Typography>
                            <Button size="small" color="primary" className={classes.btnOrder}>
                                Xem thêm
                            </Button>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={content3} title="bannertrangchu" style={{ width: 500 + 'px' }} />
                    </Hidden>
                </Card>
            </Grid>

            {/* Content 4 */}
            <Grid item xs={12} md={12} style={{ paddingTop: 80, paddingBottom: 80 }}>
                <Card className={classes.card} style={{ boxShadow: 'none' }}>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={content2} title="bannertrangchu" style={{ width: 500 + 'px' }} />
                    </Hidden>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                PHÚC LONG KIOSK CHÍNH THỨC PHỤC VỤ TẠI QUẬN 3 VÀ QUẬN 7
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                Bên cạnh 3 Kiosk mới đi vào phục vụ chính thức tại Quận 8, Phúc Long tiếp tục mở rộng mô hình Phúc Long Kiosk nhanh, tiện, hiện đại, chất lượng đến Quận 3 và Quận 7 kể từ ngày 30.06.2021.
                                Giờ đây, Khách hàng dễ dàng thưởng thức vị trà – cà phê Phúc Long truyền thống tại các cửa hàng VinMar
                                Đặc biệt, Khách hàng ghé thăm Phúc Long tại những địa điểm khai trương sẽ nhận được những món quà cực hấp dẫn:

                                Sổ tay Phúc Long cao cấp
                                Bình thể thao Phúc Long tiện lợi
                                Móc khóa Barista Phúc Long xinh xắn
                            </Typography>
                            <Button size="small" color="primary" className={classes.btnOrder}>
                                Xem thêm
                            </Button>
                        </CardContent>
                    </div>
                </Card>
            </Grid>
        </div>
    )
}

export default Content