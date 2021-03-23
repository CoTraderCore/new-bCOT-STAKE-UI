import Button from "@material-ui/core/Button";
import { useState } from "react";
import { ABIWithdraw } from "./ABI";
import { ClaimableAddress, NonClaimableAddress } from "./Addresses";
import { observer } from "mobx-react";

const handleWithdraw = (props, isClaimable, userInput) => {
  //checking if web3 is undefined
  if (props.store.web3 && props.store.accounts) {
    const contractAddress = isClaimable
      ? ClaimableAddress
      : NonClaimableAddress;
    const contract = new props.store.web3.eth.Contract(
      ABIWithdraw,
      contractAddress
    );
    console.log(contract.methods);
    contract.methods.withdraw(isClaimable).send({
      from: props.store.accounts["0"],
      value: props.store.web3.utils.toWei(userInput),
    });
  } else {
    alert("Please connect to web3");
  }
};


const Withdraw = observer((props) => {
  const [isClaimable, setIsClaimable] = useState(true);
  const [amount, setAmount] = useState("0");
  const [isDisabled, setIsDisabled] = useState(false);

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
      <div>
        <select
          onChange={(e) => setIsClaimable(e.currentTarget.value)}
          className="form-control"
        >
          <option selected value="true">
            Claimable
          </option>
          <option value="false">Non-Claimable</option>
        </select>
      </div>
      <div>{'hello'+isClaimable}</div>
      {isClaimable ? (
        <div>
          <Button
            variant="outlined"
            color="secondary"
            //onClick={() => handleClaimRewards(props, isClaimable, amount)}
          >
            Claim Rewards
          </Button>
        </div>
      ) : (
        ""
      )}

      <div className="withdraw text-center">
        {isClaimable ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleWithdraw(props, isClaimable, amount)}
          >
            Withdraw with Rewards 1
          </Button>
        ) : (
          <div>
          <Button
            variant="outlined"
            color="secondary"
            disabled={isDisabled}
           // onClick={() => handleWithdraw(props, isClaimable, amount)}
          >
            Withdraw with Rewards 2
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            //onClick={() => handleEmergencyWithdraw(props, isClaimable, amount)}
          >
            Emergency Withdraw
          </Button>
          
          </div>
        )}
      </div>
    </form>
  );
});

export default Withdraw;
