import React from 'react';
import Navbar from './Navbar';
import './App.css';
import Login from './components/Login';
import Settings from './components/Settings';
import Policies from './components/Policies';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/Settings">
              <Settings />
            </Route>
            <Route path="/Policies">
              <Policies />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
