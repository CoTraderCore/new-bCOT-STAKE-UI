import {useContext} from 'react'
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { ABIDepositor } from "./ABI";
import { AddressDepositor } from "./Addresses";
import { observer } from "mobx-react";
import CurrencyInputPanel from "./CurrencyInputPanel";
import { ThemeContext } from 'styled-components'
import "../App.css";

const handleDeposit = (props, isClaimable, userInput) => {
  //checking if web3 is undefined
  if (props.store.web3 && props.store.accounts) {
    const contract = new props.store.web3.eth.Contract(
      ABIDepositor,
      AddressDepositor
    );
    console.log(contract.methods);
    contract.methods.deposit(isClaimable).send({
      from: props.store.accounts["0"],
      value: props.store.web3.utils.toWei(userInput),
    });
  } else {
    alert("Please connect to web3");
  }
};

const Deposit = observer((props) => {
  const theme = useContext(ThemeContext);
  const [isClaimable, setIsClaimable] = useState(true);
  const [amount, setAmount] = useState("0");
  const [estimatedRewards, setEstimatedRewards] = useState("0");

  const handleChange = (value) => {
    setAmount(value);

    //call helper function to calculate estimated Value
    //const estimatedValue=helper(value);
    setEstimatedRewards(value);
  };

  return (
    <form>
      <div className="form-group mt-3">
        {/*   <input
          id="amount"
          type="text"
          className="form-control"
          placeholder="Enter Amount"
          required
          onChange={(e) => {
            handleChange(e.currentTarget.value);
          }}
        ></input> */}
        <CurrencyInputPanel></CurrencyInputPanel>
      </div>
      <div>
        <h6>Your Estimated Rewards:</h6>
        <br />
        <span className="block-example border">
          {estimatedRewards === "" ? "0" : estimatedRewards}
        </span>
      </div>

      <div>
        <select
          onChange={(e) => setIsClaimable(e.currentTarget.value)}
          className="form-control"
        >
          <option selected value="true">
            {" "}
            True
          </option>
          <option value="false">False</option>
        </select>
      </div>

      <div className="deposit text-center">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeposit(props, isClaimable, amount)}
        >
          Deposit
        </Button>
      </div>
    </form>
  );
});

export default Deposit;
