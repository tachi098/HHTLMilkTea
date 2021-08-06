import React from "react"
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, Grid, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        borderBottom: '1px solid #ececec'
    },
    title: {
        color: '#7f7f7f',
        fontSize: 14
    },
    content: {
        paddingTop: 10,
        paddingRight: 50,
        paddingLeft: 30,
        paddingBottom: 30,
        display: 'flex'
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    button: {
        marginBottom: theme.spacing(3),
        marginLeft: 50,
    },
    btnUpload: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 20,
        },
        marginTop: 10
    },
    upload: {
        display: 'grid',
        justifyItems: 'center'
    }
}));


const Profile = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Typography variant="h6">
                    HỒ SƠ CỦA TÔI
                </Typography>
                <Typography className={classes.title}>
                    Quản lý thông tin hồ sơ và bảo mật tài khoản
                </Typography>
            </div>

            <Grid container className={classes.content}>
                <Grid item md={8} xs={12} sm={12} style={{ paddingLeft: 20 }}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            name="name"
                            label="Họ tên"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            name="address"
                            label="Địa chỉ"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            name="phone"
                            label="Số điện thoại"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            name="Email"
                            label="Địa chỉ email"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid item md={4} xs={12} sm={12} style={{ paddingLeft: 30, paddingTop: 20 }}>
                    <Grid item xs={12} sm={12} className={classes.upload}>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.large} />
                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: 'none' }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                            />

                            <Button color="secondary" variant="contained" component="span" className={classes.btnUpload}>
                                Tải ảnh
                            </Button>
                        </label>
                    </Grid>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Cập nhật
            </Button>
        </React.Fragment>
    )
}

export default Profile