import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './HomePage'; // Assuming you have this component
import AboutUs from './AboutUs'; // Your AboutUs component

function App1() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutUs} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
