import Button from "@material-ui/core/Button";

const Deposit = () => {
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
        <select className="form-control" >
          <option selected value="dogecoin"> Dogecoin</option>
          <option value="ether">Ether</option>
          <option value="btc">Bitcoin</option>
        </select>
      </div>

      <div className="deposit text-center">
        <Button variant="outlined" color="secondary">
          Deposit
        </Button>
      </div>
    </form>
  );
};

export default Deposit;
