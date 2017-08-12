import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import Home from './components/Home'
import HouseholdsContainer from './components/HouseholdsContainer'
import Signup from './components/Signup'
import Login from './components/Login'
import { authenticate, authenticationFailure, logout } from './redux/modules/Auth/actions'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import NewHousehold from './components/NewHousehold'

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token')

    if (token) {
      this.props.authenticate()
    } else {
      this.props.authenticationFailure()
    }
  }

  render() {
    return (
      
        <Router>
          <div>
            <Container text>
            <Nav logout={this.props.logout} />
            </Container>
            <Container>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/households/new" component={NewHousehold} />
                <Route path="/households" component={HouseholdsContainer} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
            </Container>
          </div>
        </Router>
    );
  }
}

export default connect(null, { authenticate, authenticationFailure, logout })(App);
