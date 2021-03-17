import React, { Component } from "react";
import '../App.css'


class App extends Component {
  render() {
    return (
      <React.Fragment >
        <div
          className="card col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "300px"}}
        >
          <h1 className="cardheader text-center">Rover Capital</h1>
          <form>
            <div className="form-group mt-3">
              <input
                id="content"
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Amount"
                required
              ></input>
            </div>

            <button className="btn btn-primary btn-block" type="submit">Deposit</button>
          </form>
        </div>
      </React.Fragment >
    );
  }
}

export default App;
