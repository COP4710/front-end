import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {EventNavbar} from './components/navbar'
import React from 'react'

import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
            <EventNavbar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/createevent" component={CreateEvent}/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;