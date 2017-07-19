import React from 'react'
import {getBookings} from '../actions/booking'
import {connect} from 'react-redux'

class Bookings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bookings: props.bookings
    }
  }
  componentDidMount () {
    this.props.getBookings(this.props.user.sub)
  }

  render () {
    return (
    <div>
  <h3 className="text-center">My Bookings</h3>
  {this.props.bookings.map((booking) => {
    return (
      <div>
        <h3>Renting from</h3>
      <h4>Title: {booking.listing_name}</h4>
      <h5>ID:{booking.listing_id}</h5>
      </div>
    )
  })}

    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    bookings: state.booking
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getBookings: id => dispatch(getBookings(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
