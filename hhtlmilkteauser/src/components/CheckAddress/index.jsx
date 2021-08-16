import { FormHelperText, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    btnReloadMap: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        border: 'none',
        backgroundColor: '#2454b5',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    btnReloadMapDisable: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        color: 'black',
        border: 'none',
        backgroundColor: 'gray',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        minHeight: 400,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    map: {
        marginLeft: 200,
        [theme.breakpoints.down('md')]: {
            marginLeft: 0
        }
    },
    hide: {
        display: 'none'
    }
}));

const CheckAddress = () => {
    const classes = useStyles();
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.shippingPrice = document.getElementById('price_shipping')?.innerHTML;
        data.to = to;
        history.push("/payment", { address: data })
    }

    const [loadMap] = useState(true)
    const [from] = useState(
        "FPT Aptech HCM - Hệ Thống Đào Tạo Lập Trình Viên Quốc Tế (Since 1999), Cách Mạng Tháng Tám, Phường 11, District 3, Ho Chi Minh City, Vietnam"
    );
    const [to, setTo] = useState("");

    const adressChange = e => {
        setTo(e.target.value);
    }

    const onHandleCheckMap = () => {
        setTo(document.getElementById('destination').value);
    }

    return (
        <React.Fragment>
            {console.log(document.getElementById('price_shipping')?.innerHTML)}
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                        Địa chỉ giao hàng
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item md={5} sm={12} style={{ marginTop: 20 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        id="to_places"
                                        label="Nhập địa chỉ giao hàng"
                                        defaultValue={to}
                                        fullWidth
                                        placeholder="Nhập địa chỉ"
                                        onChange={adressChange}
                                    />
                                    <input id="destination" name="origin" type="hidden" value={to} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="phone"
                                        label="Số điện thoại"
                                        inputRef={register({ required: true })}
                                        fullWidth
                                    />
                                    {errors.phone && (
                                        <FormHelperText style={{ color: "red" }}>
                                            Số điện thoại không được để trống
                                        </FormHelperText>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        multiline
                                        rows={3}
                                        name="note"
                                        label="Ghi chú"
                                        inputRef={register}
                                        fullWidth
                                    />
                                </Grid>
                                <button
                                    type="submit"
                                    style={{ marginTop: 10 }}
                                    id="btnSubmit"
                                    className={classes.btnReloadMapDisable}
                                    disabled={true}
                                >
                                    Tiếp theo
                                </button>
                            </form>
                        </Grid>
                        <Grid item md={7} sm={12}>
                            <div className={classes.map}>
                                {loadMap && (
                                    <>
                                        <form>
                                            <div className="checkout-form-list" hidden>
                                                <label>
                                                    Vị trí cửa hàng <span className="required">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="from"
                                                    id="from_places"
                                                    disabled
                                                    value={from}
                                                />
                                                <input id="origin" name="origin" type="hidden" value={from} />
                                            </div>

                                            <div className="checkout-form-list" hidden >
                                                <div className="form-group">
                                                    <label>Travel Mode</label>
                                                    <select id="travel_mode" name="travel_mode">
                                                        <option value="DRIVING">DRIVING</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="order-button-payment">
                                                <input onClick={onHandleCheckMap} value="Cập nhật bản đồ" disabled={to !== "" ? false : true} className={to !== "" ? classes.btnReloadMap : classes.btnReloadMapDisable} type="button" id="distance_form" />
                                            </div>
                                        </form>

                                        <div id="mapResult" style={{ display: 'none' }}>
                                            <div>
                                                <label htmlFor="Kilometers">Khoảng cách: </label>&nbsp;
                                                <label id="in_kilo"></label>
                                            </div>
                                            <div>
                                                <label htmlFor="Duration">Thời gian giao hàng: </label>&nbsp;
                                                <label id="duration_text"></label>
                                            </div>
                                            <div>
                                                <label htmlFor="Price">Chi phí giao hàng: </label>&nbsp;
                                                <label id="price_shipping"></label>
                                                &nbsp;<label>VNĐ</label>
                                            </div>
                                        </div>

                                        <div id="result" className="hide">
                                        </div>

                                        <div className="col-lg-6 col-12">
                                            <div id="map" style={{ height: "400px", width: "500px" }}></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </React.Fragment >
    )
}

export default CheckAddress