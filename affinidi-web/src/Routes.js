import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import ShareCredential from "./containers/ShareCredential";
import AcceptCredential from "./containers/AcceptCredentials";
// import Policies from './containers/Policies'
import Signup from "./containers/Signup";
import Wallet from "./containers/Wallet";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AppliedRoute
        path="/share-credentials"
        exact
        component={ShareCredential}
        appProps={appProps}
      />
      <AppliedRoute
        path="/accept-credentials"
        exact
        component={AcceptCredential}
        appProps={appProps}
      />
      <AppliedRoute
        path="/wallet"
        exact
        component={Wallet}
        appProps={appProps}
      />
      {/* <AppliedRoute path='/policies' exact component={Policies} appProps={appProps} /> */}
      <AppliedRoute component={NotFound} />
    </Switch>
  );
}
