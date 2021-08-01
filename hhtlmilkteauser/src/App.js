import Home from "./components/Home";
import DefaultLayout from "./components/layout/DefaultLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Milktea from "./components/Milktea";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { CssBaseline } from "@material-ui/core";
import ScrollOnTop from "./common/ScrollOnTop";
import Dessert from "./components/Dessert";
import { ToastContainer } from "react-toastify";
import Product from "./components/Product";
import Checkout from "./components/Checkout";
import ShoppingCart from "./components/ShoppingCart";
import Account from "./components/Account";

const App = () => {
    return (
        <>
            <ToastContainer />
            <Router>
                <DefaultLayout>
                    <CssBaseline />
                    <ScrollOnTop>
                        <Switch>
                            <Route path={["/", "/home"]} exact component={Home} />
                            <Route path="/milktea" exact component={Milktea} />
                            <Route path="/dessert" exact component={Dessert} />
                            <Route path="/product" exact component={Product} />
                            <Route path={["/account", "/account/history", "/account/voucher"]} exact component={Account}/>
                            <Route path="/signin" exact component={SignIn} />
                            <Route path="/signup" exact component={SignUp} />
                            <Route path="/checkout" exact component={Checkout} />
                            <Route path="/shoppingcart" exact component={ShoppingCart} />
                        </Switch>
                    </ScrollOnTop>
                </DefaultLayout>
            </Router>
        </>
    )
}

export default App