import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    map: {
        border: 0,
        width: 400,
        heigth: 200,
        [theme.breakpoints.down("md")]: {
            width: 300,
            heigth: 200,
        },
    }
}))

const GoogleMap = () => {

    const classes = useStyles();

    return (
        <div>
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325247592156!2d106.6641083138226!3d10.78638226196169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed23c80767d%3A0x5a981a5efee9fd7d!2zNTkwIEPDoWNoIE3huqFuZyBUaMOhbmcgVMOhbSwgUGjGsOG7nW5nIDExLCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1624202569747!5m2!1svi!2s" className={classes.map} loading="lazy"></iframe>
        </div>
    );
}

export default GoogleMap