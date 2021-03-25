import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import {BrowserRouter} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
//import Trial from './Components/Trial' 

ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter> , document.getElementById("root"));
