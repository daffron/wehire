import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {BrowserHistory, Redirect} from 'react-router'
import {isUserComplete} from '../actions/index'

import Login from './Login'
import Logout from './Logout'
import NewProfile from './NewProfile'

// import {initProfile} from '../actions/loginauth0'
import {capitalize} from '../utils/functions'

function App (props) {
  return (
  <Router history={BrowserHistory}>
    <div className='app'>
      <img src="/images/logo.png"/>
      {!props.isAuthenticated ? <Login /> : <Logout />}
      {props.isAuthenticated && <h1>Welcome Back, {capitalize(props.user.given_name)}</h1>}
      {!props.completeUser && <NewProfile />}
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
    completeUser: dispatch(isUserComplete(this.props.user.user_id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
