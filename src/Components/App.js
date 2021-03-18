import React, { Component } from "react";
import "../App.css";
import ControlledTabs from './ControlledTabs'
class App extends Component {
  render() {
    return (
        <div
          className="card col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "320px" }}
        >
          <h1 className="cardheader text-center">Rover Capital</h1>
          <ControlledTabs/>
          
        </div>
    );
  }
}

export default App;
