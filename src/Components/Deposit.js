import Button from "@material-ui/core/Button";
import { useState } from 'react';
import { getABI } from './ABI';
import { getAddress } from './Addresses';
import { observer } from "mobx-react"

const handleDeposit=(props,isClaimable)=>{
  var ABIDeposit=getABI();
  var addressDeposit=getAddress();
  console.log(props.store.web3)

  //checking if web3 is undefined
  if(props.store.web3)
  {
    const contract = new props.store.web3.eth.Contract(ABIDeposit, addressDeposit)
    contract.methods.deposit(isClaimable); 
    console.log('Done');
  }
 
}

const Deposit =observer( (props) => {
  const [isClaimable, setIsClaimable] = useState(true);

  return (
    <form>
      <div className="form-group mt-3">
        <input
          id="amount"
          type="text"
          className="form-control"
          placeholder="Enter Amount"
          required
        ></input>
      </div>
      <div >
        <select onChange={(e)=>setIsClaimable(e.currentTarget.value)} className="form-control" >
          <option selected value="true"> True</option>
          <option value="false">False</option>
        </select>
      </div>
   
      <div className="deposit text-center">
        <Button variant="outlined" color="secondary" onClick={handleDeposit(props,isClaimable)}>
          Deposit
        </Button>
      </div>
    </form>
  );
});

export default Deposit;
