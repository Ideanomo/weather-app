import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App"

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById("root")
);