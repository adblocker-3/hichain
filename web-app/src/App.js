import React from 'react';
import './App.css';
import Login from './components/Login';
import Settings from './components/Settings';
import Policies from './components/Policies';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
      <Route exact path='/' component={Login} />
      <Route exact path='/Settings' component={Settings} />
      <Route exact path='/Policies' component={Policies} />
    </div>
    </Router>
  );
}

export default App;
