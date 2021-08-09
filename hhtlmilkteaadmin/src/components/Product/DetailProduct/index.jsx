import { Avatar, Chip, Grid, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BarCode from "react-barcode"
import { ExitToApp } from "@material-ui/icons";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: "hidden",
        paddingLeft: 30
    },
    displayImg: {
        marginTop: 20
    },
    content: {
        marginTop: 40
    },
    navButton: {
        display: 'flex',
        marginTop: -115,
        paddingBottom: 20,
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
        },
    }
}));

const DetailProduct = () => {

    const classes = useStyles();
    const location = useLocation();
    const [product] = useState(location.state.product)
    const history = useHistory();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h4">
                        Thông tin sản phẩm
                    </Typography>

                    <Grid container spacing={3}>

                        <Grid item md={5} xs={12}>
                            <img alt="" src={product.linkImage} className={classes.displayImg} width={350} height={400} />
                        </Grid>
                        <Grid item md={7} xs={12}>
                            <div className={classes.content}>
                                <Typography variant="h6">
                                    Tên sản phẩm:
                                </Typography>
                                <Typography variant="subtitle1">{product.name}</Typography>
                                <Typography variant="h6">
                                    Giá sản phẩm:
                                </Typography>
                                <Typography variant="subtitle1">{product.price}</Typography>
                                <Typography variant="h6">
                                    Chú thích:
                                </Typography>
                                <Typography variant="subtitle1">{product.title}</Typography>
                                <Typography variant="h6">
                                    Loại sản phẩm:
                                </Typography>
                                <Typography variant="subtitle1">{product.categoryId.name}</Typography>
                                <Typography variant="h6">
                                    Kích thước sản phẩm:
                                </Typography>
                                {
                                    product.sizeOptions.map((item) => (
                                        <Chip key={item.id} label={item.name} color="primary" />
                                    ))
                                }
                                <Typography variant="h6">
                                    Topping thêm vào:
                                </Typography>
                                {
                                    product.additionOptions.map((item) => (
                                        <Chip key={item.id} label={item.name} color="primary" />
                                    ))
                                }
                                <Typography variant="h6">
                                    Barcode:
                                </Typography>
                                <BarCode value={product.id} />
                            </div>
                        </Grid>
                        <div className={classes.navButton}>
                            <Avatar style={{ width: 50, height: 50, marginRight: 20, backgroundColor: 'red', cursor: 'pointer' }} onClick={() => { history.push("/product") }}>
                                <ExitToApp style={{ fontSize: 30 }} />
                            </Avatar>
                            <Avatar style={{ cursor: "pointer", width: 50, height: 50, backgroundColor: "#FC8400" }}>
                                <PictureAsPdfIcon style={{ fontSize: 30 }} />
                            </Avatar>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default DetailProduct