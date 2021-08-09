import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
