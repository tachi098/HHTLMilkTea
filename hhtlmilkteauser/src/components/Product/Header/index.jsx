import React from "react"
import { Breadcrumbs, Grid, Typography } from "@material-ui/core"
import { Carousel } from "react-responsive-carousel";
import banner from "./../../../assets/img/productbanner.jpg"
import { Link } from "react-router-dom"
import icon from "./../../../assets/img/icon_tealeaves.png"

const Header = () => {
    return (
        <React.Fragment>
            {/* Start Banner */}
            <Grid item md={12}>
                <Carousel showThumbs={false} showStatus={false} showIndicators={false} >
                    <div>
                        <img alt="Banner1" src={banner} />
                    </div>
                </Carousel>
            </Grid>
            {/* End Breadcrumbs */}

            {/* Start Breadcrumbs */}
            <Grid item md={12} xs={12}>
                <Breadcrumbs aria-label="breadcrumb" style={{ display: 'flex', justifyContent: 'center', marginTop: 30 + 'px' }}>
                    <Link color="inherit" to="/home" style={{ textDecoration: 'none', color: '#a3abb5' }} >
                        Trang chủ
                    </Link>
                    <Typography color="textPrimary">Sản phẩm</Typography>
                </Breadcrumbs>
            </Grid>

            {/* End Breadcrumbs */}

            {/* Start Title */}
            <Grid item md={12} xs={12}>
                <Typography color="textPrimary" style={{
                    textAlign: 'center',
                    fontSize: 40 + 'px',
                    padding: 0 + 'px' + 25 + 'px',
                    color: '#0C713D',
                    fontFamily: 'lora'
                }}>Sản phẩm</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
                <Typography style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={icon} alt="" />
                </Typography>
            </Grid>
            {/* End Title */}

        </React.Fragment>
    );
}

export default Header