import { Grid, Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography, Container, FormControl, NativeSelect, TextField, Dialog, DialogContent, DialogActions, TextareaAutosize } from "@material-ui/core"
import ProductImg from "./../../../assets/img/product1.jpg"
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Notification from "../../../common/Notification";


const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        backgroundColor: '#fafafa',
        '&:hover': {
            boxShadow: '2px 4px 4px 2px  #a5abb5'
        }
    },
    cardMedia: {
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
        paddingTop: '76.25%',
        width: '75%',
    },
    cardContent: {
        flexGrow: 1,
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
    },
    iconButton: {
        marginTop: 8
    },
    formControl: {
        marginTop: -3,
        minWidth: 200,
    },
    cardMediaModal: {
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
        paddingTop: '100%',
        width: '100%',
    },
    rdSize: {
        padding: 3,
        backgroundColor: '#1db4ff',
        outline: 'none',
    },
    btnCount: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 24
    },
    searchItem: {
        display: 'flex',
        padding: 25,
        borderRight: '1px solid #ececec',
        [theme.breakpoints.down('sm')]: {
            borderRight: 'none',
            paddingLeft: 40
        },
    },
    itemHeader: {
        position: 'relative'
    },
    iconWishList: {
        position: 'absolute',
        marginLeft: '85%',
        marginTop: '5%',
        fontSize: 30,
        color: '#9e9796',
        '&:hover': {
            color: '#416c48',
        }
    },
    itemTag: {
        backgroundColor: '#416c48',
        padding: '3px 18px',
        color: 'white',
        marginTop: '5%',
        marginLeft: '5%',
        position: 'absolute',
        fontSize: 9,
        fontWeight: 'bold'
    }
}));

const Content = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onHandleWishList = () => {
        Notification.success("Đã thêm sản phẩm vào wishlist")
    }


    return (
        <Container className={classes.cardGrid} maxWidth="lg">

            {/* Start Filter Bar */}
            <Grid container style={{ flexGrow: 1, border: '2px solid #ececec', width: '100%', marginBottom: 30 }}>
                <Grid item md={4} sm={12} className={classes.searchItem}>
                    <Typography style={{ marginRight: 10 }}>
                        <b>So sánh theo giá </b>
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <NativeSelect
                            className={classes.selectEmpty}
                            name="price"
                            inputProps={{ 'aria-label': 'price' }}
                        >
                            <option>Không chọn lựa</option>
                            <option>Tăng dần</option>
                            <option>Giảm dần</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>

                <Grid item md={4} sm={12} className={classes.searchItem}>
                    <Typography style={{ marginRight: 10 }}>
                        <b>So sánh theo tên </b>
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <NativeSelect
                            className={classes.selectEmpty}
                            name="name"
                            inputProps={{ 'aria-label': 'name' }}
                        >
                            <option>Không chọn lựa</option>
                            <option>Tăng dần</option>
                            <option>Giảm dần</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>

                <Grid item md={4} sm={12} className={classes.searchItem}>
                    <Typography style={{ marginRight: 10 }}>
                        <b>Tìm kiếm: </b>
                    </Typography>
                    <div style={{ display: 'flex', marginTop: -21 }}>
                        <form>
                            <TextField label="Nhập tên sản phẩm" />
                            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </form>
                    </div>
                </Grid>
            </Grid>
            {/* End Filter Bar */}

            <Grid container spacing={3} style={{ marginTop: 20 }}>
                {[...Array(12)].map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <div className={classes.itemHeader}>
                                <span className={classes.itemTag}>Món mới</span>
                                <FavoriteIcon className={classes.iconWishList} style={{ cursor: 'pointer' }} onClick={onHandleWishList} />
                            </div>
                            <CardMedia
                                className={classes.cardMedia}
                                image={ProductImg}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center", fontSize: 16, fontWeight: 'bold' }}>
                                    Trà xanh hoa sen
                                </Typography>
                                <Typography style={{ textAlign: "center", fontSize: 14 }}>
                                    lotus tea
                                </Typography>
                                <Typography style={{ textAlign: "center", color: "#0c713d", fontWeight: 'bold' }}>
                                    28.000 VNĐ
                                </Typography>
                            </CardContent>
                            <CardActions style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                <Button size="small" color="primary" className={classes.btnOrder} onClick={handleClickOpen}>
                                    Đặt hàng
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog
                open={open}
                keepMounted
                maxWidth="md"
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form>
                    <DialogContent>
                        <div id="alert-dialog-slide-description" style={{ display: 'flex' }}>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={ProductImg}
                                        title="Image title"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: "center", fontSize: 36, fontWeight: 'bold', color: "#0c713d" }}>
                                        Trà xanh hoa sen
                                    </Typography>
                                    <Typography style={{ textAlign: "center", fontSize: 14 }}>
                                        Lotus tea
                                    </Typography>

                                    <div style={{ display: 'flex', marginTop: 30 }}>
                                        <Typography style={{ marginRight: 60 }}>
                                            <b>Số lượng: </b>
                                        </Typography>
                                        {/* <TextField defaultValue={0} type="number" style={{ marginTop: 0 }} /> */}
                                        <div style={{ display: 'flex', marginTop: -10 }}>
                                            <button className={classes.btnCount}>-</button>
                                            <p style={{ marginLeft: 20, marginRight: 20 }}>0</p>
                                            <button className={classes.btnCount}>+</button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', marginTop: 10 }}>
                                        <Typography style={{ marginRight: 70 }}>
                                            <b>Ghi chú: </b>
                                        </Typography>
                                        <TextareaAutosize aria-label="minimum height" minRows={5} placeholder="" />
                                    </div>

                                    <div style={{ display: 'flex', marginTop: 50 }}>
                                        <Typography style={{ marginRight: 70 }}>
                                            <b>Tổng tiền: </b>
                                        </Typography>
                                        <Typography style={{ textAlign: "center", color: "#0c713d", fontWeight: 'bold' }}>
                                            28.000 VNĐ
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <Button size="small" color="primary" className={classes.btnOrder} onClick={handleClickOpen}>
                            Đặt hàng
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    )
}

export default Content