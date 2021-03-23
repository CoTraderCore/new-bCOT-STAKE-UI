import Button from "@material-ui/core/Button";
import { useState,useEffect } from "react";
import { ABIWithdraw } from "./ABI";
import { NonClaimableAddress } from "./Addresses";
import { observer } from "mobx-react";
import "../App.css";


const NonClaimable = observer((props) => {
  const [amount, setAmount] = useState("0");
  const [isDisabled, setIsDisabled] = useState(true);


  useEffect(() => {
    async function checkDate() {
        if (props.store.web3 && props.store.accounts) {
            const contract = new props.store.web3.eth.Contract(
              ABIWithdraw,
              NonClaimableAddress
            );
      
            console.log(contract.methods);
            const unixDate = await contract.methods.END_STAKE().call()
            console.log(unixDate);
            
            if((Date.now() / 1000) > unixDate){
              setIsDisabled(false)
          };

         
      }
    };
    checkDate();
}, [isDisabled,props]);

  const handleNonClaimableWithdraw =async (props, userInput) => {
    //checking if web3 is undefined
    if (props.store.web3 && props.store.accounts) {
      const contract = new props.store.web3.eth.Contract(
        ABIWithdraw,
        NonClaimableAddress
      );

      console.log(contract.methods);
      const unixDate = await contract.methods.END_STAKE().call()
      console.log(unixDate);
      
      if((Date.now() / 1000) > unixDate){
        setIsDisabled(false)
    }
      
      contract.methods.withdraw(props.store.web3.utils.toWei(userInput)).send({
        from: props.store.accounts["0"],
      });
    } else {
      alert("Please connect to web3");
    }
  };

  const handleExit = (props) => {

    if (props.store.web3 && props.store.accounts) {
        const contract = new props.store.web3.eth.Contract(
          ABIWithdraw,
          NonClaimableAddress
        );
        console.log("exiting...");
        contract.methods.exit();
      } else {
        alert("Please connect to web3");
      }
};

  return (
    <form>
      <div className="form-group mt-3">
        <input
          id="amount"
          type="text"
          className="form-control"
          placeholder="Enter Amount"
          required
          onChange={(e) => setAmount(e.currentTarget.value)}
        ></input>
      </div>

      <div className="redButton">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleNonClaimableWithdraw(props, amount)}
        >
          Withdraw
        </Button>
      </div>

      <div className="redButton">
        <Button
          variant="outlined"
          color="secondary"
          disabled={isDisabled}
          onClick={() => handleExit(props)}
        >
          Exit
        </Button>
      </div>
    </form>
  );
});

export default NonClaimable;
