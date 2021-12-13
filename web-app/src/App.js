import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import LandingPage from './components/LandingPage'
import LoginPage from './components/SignIn'
import RegisterPage from './components/Register'
import ForgetPasswordPage from './components/ForgetPassword'
import Policies from './components/Policies'
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div>
          <Switch>
              <Route exact path="/" component={ LandingPage } />
              <Route path="/login" component={ LoginPage } />
              <Route path="/register" component={ RegisterPage } />
              <Route path="/forget-password" component={ ForgetPasswordPage } />
              <Route path="/home" component={ Policies } />
              <Route path="/policies" component={ Policies } />
              <Route path="/settings" component={ Settings } />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
