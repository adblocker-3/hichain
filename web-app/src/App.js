import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import ForgetPassword from './components/ForgetPassword'
import Policies from './components/Policies'
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div>
          <Switch>
              <Route exact path="/" component={ LandingPage } />
              <Route path="/login" component={ Login } />
              <Route path="/register" component={ Register } />
              <Route path="/forget-password" component={ ForgetPassword } />
              <Route path="/home" component={ Policies } />
              <Route path="/policies" component={ Policies } />
              <Route path="/settings" component={ Settings } />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
