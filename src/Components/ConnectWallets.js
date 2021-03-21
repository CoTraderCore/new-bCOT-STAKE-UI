import React, { Component } from 'react';
import Button  from '@material-ui/core/Button';
import { observer } from "mobx-react"

export default observer(
  
  class Wallet extends Component {

    connectWallet=async() =>{
      console.log(this.props.store.account);
      await this.props.store.getweb3().then((response) => {
        response.eth.getAccounts().then((result) => console.log(result));
      });
    }
    
    render() { 
      return (
        <div>
        {(this.props.store.account)? <Button variant="outlined" color="secondary">Thanks!</Button>: <Button variant="outlined" color="secondary" onClick = {this.connectWallet}>Connect</Button>}
        </div>
         
        );
    }
  }
  
);


