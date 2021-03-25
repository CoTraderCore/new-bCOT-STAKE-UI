import React, { Component } from "react";
import "../App.css";
import ControlledTabs from "./ControlledTabs";
import ConnectWallet from './ConnectWallets'

class Trial extends Component {
  
  render() {
    
    return (  
      <div className="connect text-center">
        <ConnectWallet store={this.props.walletStore}/>
        <div
          className="card col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "320px" }}
        >
          <div></div>
          <h1 className="cardheader text-center">Rover Capital</h1>
          <ControlledTabs store={this.props.walletStore}/>
        </div>
      </div>
    );
  }
}

export default Trial;
