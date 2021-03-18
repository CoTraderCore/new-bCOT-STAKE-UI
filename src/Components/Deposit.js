import Button from '@material-ui/core/Button';

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
      <div className="text-center">
        <Button variant="outlined" color="secondary">
          Deposit
        </Button>
      </div>
    </form>
  );
};

export default Deposit;
