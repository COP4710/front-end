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
import Login from './pages/Login'
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: localStorage.getItem('login'),
      username: localStorage.getItem('username')
    }

    this.accountChange = this.accountChange.bind(this)
  }

  accountChange(dataIn) {
    if(dataIn.login == true || localStorage.getItem('login') == true) {
      localStorage.setItem('login', true)
      localStorage.setItem('username', dataIn.username)
      localStorage.setItem('password', dataIn.password)

    } else {
      localStorage.setItem('login', false)
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }

    this.setState({loggedIn: localStorage.getItem('login')})
    this.setState({username: localStorage.getItem('username')})
    this.setState({password: localStorage.getItem('password')})
  }

  render() {
    return (
      <Router>
        <div className="App">
            <EventNavbar loggedState={this.state.loggedIn} username={this.state.username} onAccountChanged={this.accountChange}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/createevent" component={CreateEvent}/>
              <Route path="/login">
                <Login loggedState={this.state.loggedIn} onAccountChanged={this.accountChange}/>
              </Route>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;