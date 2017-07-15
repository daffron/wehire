import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {BrowserHistory} from 'react-router'

import {isUserComplete} from '../utils/api'
import UserDashboard from './UserDashboard'
import CreateListing from './CreateListing'
import NewProfile from './NewProfile'
import EditProfile from './EditProfile'
import NavBar from './NavBar'
import DisplayListings from './DisplayListings'
import MyProfile from './MyProfile'
import LandingPage from './LandingPage'
import Listing from './Listing'

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
            <Route exact path='/' component={LandingPage} />
            <Route path='/mywehire' component={UserDashboard} />
            <Route path='/createlisting' component={CreateListing} />
            <Route path='/myprofile' component={MyProfile} />
            <Route path='/myprofile/edit' component={EditProfile} />
            <Route path='/listing/:id' component={Listing} />
            <div>
              {this.props.firstLogin && this.props.isAuthenticated && <NewProfile isComplete={this.isComplete} />}
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
