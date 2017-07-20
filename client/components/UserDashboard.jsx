import React from 'react'
import {Link, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUsersListings} from '../actions/listing'
import Bookings from './Bookings'
import Booking from './Booking'
import {getRentingFromBookings, getRentingToBookings} from '../actions/booking'

class UserDashboard extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    this.props.getUsersListings(this.props.user.sub)
    this.props.getRentingFromBookings(this.props.user.sub)
    this.props.getRentingToBookings(this.props.user.sub)
  }

  goToProfile () {
    this.props.history.push('/myprofile')
  }

  render () {
    return (
      <div>
        <h3>My WeHire</h3>
        <Link to='/createlisting'> Create a listing </Link>
        <Link to='/mywehire/bookings/'>View your Bookings </Link>
        <Route path='/mywehire/bookings' component={Bookings} />
        <Route path='/mywehire/bookings/:id' component={Booking} />        
        <button onClick={this.goToProfile.bind(this)}>Profile</button>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    listings: state.listing
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getUsersListings: id => dispatch(getUsersListings(id)),
    getRentingFromBookings: id => dispatch(getRentingFromBookings(id)),
    getRentingToBookings: id => dispatch(getRentingToBookings(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)
