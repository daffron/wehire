import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {BrowserHistory, Redirect} from 'react-router'

import Login from './Login'
import Logout from './Logout'
import NewProfile from './NewProfile'

import {initProfile} from '../actions/loginauth0'

function App (props)  {
  return (
  <Router history={BrowserHistory}>
    <div className='app'>
      <img src="/images/logo.png"/>
      {!props.isAuthenticated ? <Login /> : <Logout />}
      {props.isAuthenticated && <h1>Welcome Back, {props.user.name}</h1>}
      <NewProfile />
    </div>
  </Router>
  )
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstLogin: state.auth.firstLogin,
    user: state.auth.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUser: dispatch(initProfile())
  }
}
export default connect(mapStateToProps)(App)