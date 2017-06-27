import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {BrowserHistory, Redirect} from 'react-router'

import Login from './Login'
import Logout from './Logout'

const App = () => (
  <Router history={BrowserHistory}>
    <div className='app'>
      <Login />
      <Logout />
    </div>
  </Router>
)

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstLogin: state.auth.firstLogin,
    waiting: state.waiting
  }
}
export default connect(mapStateToProps)(App)