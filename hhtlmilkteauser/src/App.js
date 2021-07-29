import Home from "./components/Home";
import DefaultLayout from "./components/layout/DefaultLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Milktea from "./components/Milktea";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { CssBaseline } from "@material-ui/core";
import ScrollOnTop from "./common/ScrollOnTop";

const App = () => {
    return (
        <Router>
            <DefaultLayout>
                <CssBaseline />
                <ScrollOnTop>
                    <Switch>
                        <Route path={["/", "/home"]} exact component={Home} />
                        <Route path="/milktea" exact component={Milktea} />
                        <Route path="/signin" exact component={SignIn} />
                        <Route path="/signup" exact component={SignUp} />
                    </Switch>
                </ScrollOnTop>
            </DefaultLayout>
        </Router>

    )
}

export default App