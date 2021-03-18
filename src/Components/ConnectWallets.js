import {useState } from "react";
import Wallet_Model from "../models/wallet_model";
import Button  from '@material-ui/core/Button';

function ConnectWallet () {
  const { web3Loading, getweb3 } = Wallet_Model();
  const [myWeb3, setMyWeb3] = useState();
  async function connectWallet() {
    await getweb3().then((response) => {
      setMyWeb3(response);
      response.eth.getAccounts().then((result) => console.log(result));
    });
  }
  return (
  <div>
  {(web3Loading)? <Button variant="outlined" color="secondary">Thanks!</Button>: <Button variant="outlined" color="secondary"onClick = {connectWallet}>Connect</Button>}
  </div>
   
  );
};

export default ConnectWallet;
