import React, { Component } from "react";
import "../App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { walletStore } from "../models/wallet_model";
import NotFound from './NotFound';
import Main from './Main'

class App extends Component {
  render() {
    return (
      <div>
        <main className="container ">
          <Switch>
            <Route path="/swap" render={(props) => <Main walletStore={walletStore} {...props}/>}></Route>
            <Route path="/not-found" component={NotFound} ></Route>
            <Redirect to="not-found"></Redirect>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
