import React, { Component } from 'react';
import Button  from '@material-ui/core/Button';
import { observer } from "mobx-react"

export default observer(
  
  class Wallet extends Component {

    connectWallet=async() =>{
      await this.props.store.getweb3().then((response) => {
        response.eth.getAccounts().then((result) => {console.log(result);this.props.store.accounts=result});
      });
    }
    
    render() { 
      return (
        <div>
        {(this.props.store.account)? <h1>Account Connected Successfully!</h1>: <Button variant="outlined" color="secondary" onClick = {this.connectWallet}>Connect</Button>}
        </div>
         
        );
    }
  }
  
);


