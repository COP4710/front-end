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
      username: localStorage.getItem('username'),
      permissionLevel: localStorage.getItem('permissionLevel'),
      events: []
    }

    this.accountChange = this.accountChange.bind(this)
    this.onEventCreated = this.onEventCreated.bind(this)
  }

  accountChange(dataIn) {
    if(dataIn.login == true || localStorage.getItem('login') == true) {
      localStorage.setItem('login', true)
      localStorage.setItem('username', dataIn.username)
      localStorage.setItem('permissionLevel', dataIn.permissionLevel)
    } else {
      localStorage.setItem('login', false)
      localStorage.removeItem('username')
      localStorage.removeItem('permissionLevel')
    }

    this.setState({loggedIn: localStorage.getItem('login')})
    this.setState({username: localStorage.getItem('username')})
    this.setState({permissionLevel: localStorage.getItem('permissionLevel')})
  }

  onEventCreated(dataIn) {
    this.setState({
      events: [...this.state.events, dataIn]
    })
  }

  render() {
    console.log("in app.js " + this.state.permissionLevel)
    console.log(this.state.events)
    return (
      <Router>
        <div className="App">
            <EventNavbar loggedState={this.state.loggedIn} username={this.state.username} onAccountChanged={this.accountChange}/>
            <Switch>
              <Route exact path="/">
                <Home 
                  events={this.state.events} loggedState={this.state.loggedIn} permissionLevel={this.state.permissionLevel}
                  username={this.state.username}/>
              </Route>
              <Route path="/createevent">
                <CreateEvent 
                  username={this.state.username} permissionLevel={this.state.permissionLevel}
                  onEventCreated={this.onEventCreated}
                />
              </Route>
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