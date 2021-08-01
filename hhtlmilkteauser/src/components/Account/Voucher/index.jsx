import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import voucher from "./../../../assets/img/voucher.jpg"

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        borderBottom: '1px solid #ececec'
    },
    root: {
        display: 'flex',
    },
    title: {
        color: '#7f7f7f',
        fontSize: 14
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    voucher: {
        paddingRight: 20,
        paddingBottom: 20
    }
}));

const Voucher = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.header}>
                <Typography variant="h6">
                    VOUCHER
                </Typography>
                <Typography className={classes.title}>
                    Quản lý các voucher của bạn
                </Typography>
            </div>


                <Grid container style={{ display: 'flex', padding: 20 }}>
                {[...Array(12)].map((item, index) => (
                    <Grid key={index} item md={6} xs={12} sm={12} className={classes.voucher}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image={voucher}
                                title="Voucher 2021"
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        Voucher 2021
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Hạn sử dụng: 8/1/2021
                                    </Typography>
                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                ))}
                </Grid>

        </React.Fragment>
    )
}

export default Voucher