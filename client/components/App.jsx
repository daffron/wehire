import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {BrowserHistory, Redirect} from 'react-router'
import {isUserComplete} from '../utils/api'

import NewProfile from './NewProfile'
import NavBar from './NavBar'

import {capitalize} from '../utils/functions'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      validUser: false
    }
  }

  componentDidMount () {
    isUserComplete(this.props.user.user_id, result => {
      this.setState({
        validUser: result
      })
    })
  }

  render () {
    return (
    <Router history={BrowserHistory}>
      <div className='app'>
        <NavBar />
        {this.props.isAuthenticated && <h1>Welcome Back, {capitalize(this.props.user.given_name)}</h1>}
        {!this.state.validUser && <NewProfile />}
      </div>
    </Router>
    )
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstLogin: state.auth.firstLogin,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App)
