import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {BrowserHistory} from 'react-router'
import {isUserComplete} from '../utils/api'
import UserDashboard from './UserDashboard'
import CreateListing from './CreateListing'

import NewProfile from './NewProfile'
import NavBar from './NavBar'
import DisplayListings from './DisplayListings'

import {capitalize} from '../utils/functions'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      validUser: true
    }
    this.isComplete = this.isComplete.bind(this)
  }

  isComplete () {
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
          <Route render={routerProps => <NavBar {...routerProps} />} />
            <Route path='/mywehire' component={UserDashboard} />
            <Route path='/hire' component={CreateListing} />
            <div>
              {this.props.isAuthenticated && <h1>Welcome Back, {capitalize(this.props.user.given_name)}</h1>}
              {!this.state.validUser && this.props.isAuthenticated && <NewProfile isComplete={this.isComplete} />}
            </div>
        <Route path='/search' component={DisplayListings} />
        </div>
      </Router>
    )
  }
}

function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstLogin: state.auth.firstLogin,
    user: state.auth.user,
    listings: state.listingResults
  }
}

export default connect(mapStateToProps)(App)
