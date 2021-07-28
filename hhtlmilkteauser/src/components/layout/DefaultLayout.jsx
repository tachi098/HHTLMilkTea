import { Container, makeStyles } from "@material-ui/core";
import Footer from "./Footer";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(4),
        paddingLeft: 0 + 'px',
        paddingRight: 0 + 'px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(4),
        },
    },
}));

const DefaultLayout = ({ children }) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Header />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
                <Footer/>
            </main>
        </div>
    )
}

export default DefaultLayout