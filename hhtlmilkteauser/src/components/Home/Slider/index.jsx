import { Grid } from "@material-ui/core"
import { Carousel } from "react-responsive-carousel";
import banner1 from "./../../../assets/img/banner1.png"
import banner2 from "./../../../assets/img/banner2.jpg"
import banner3 from "./../../../assets/img/banner3.jpg"

const Slide = () => {

    return (
        <Grid item md={12}>
            <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay>
                <div>
                    <img alt="Banner1" src={banner1}/>
                </div>
                <div>
                    <img alt="banner2" src={banner2} />
                </div>
                <div>
                    <img alt="banner3" src={banner3} />
                </div>
            </Carousel>
        </Grid>
    );
}

export default Slide