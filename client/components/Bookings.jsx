import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

class Bookings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bookings: props.bookings
    }
  }

  componentDidMount () {
  }

  render () {
    return (
    <div className='users-bookings'>
  <h3 className="text-center">My Bookings</h3>
        <h3>Renting from</h3>
<table className='booking-table'>
  <tr>
        <th>Listing ID</th>
        <th>Listing Title</th>
        <th>Date From</th>
        <th>Date to</th>
        </tr>
  {this.props.rentingfrom.map(booking => {
    return (
      <tbody>
          <tr>
            <td>{booking.listing_id}</td>
            <td>{booking.listing_name}</td>
            <td>{booking.booked_dates[0]} </td>
            <td>{moment(booking.booked_dates[booking.booked_dates.length - 1]).format('DD/MM/YYYY')}</td>
            </tr>
      </tbody>
    )
  })}
    </table>
      <h3>Renting To</h3>
    <table className='booking-table'>
  <tr>
        <th>Listing ID</th>
        <th>Listing Title</th>
        <th>Date From</th>
        <th>Date To</th>
        </tr>
  {this.props.rentingto.map(booking => {
    return (
      <tbody>
          <tr>
            <td>{booking.listing_id}</td>
            <td>{booking.listing_name}</td>
            <td>{booking.booked_dates[0]} </td>
            <td>{moment(booking.booked_dates[booking.booked_dates.length - 1]).format('DD/MM/YYYY')}</td>
            </tr>
      </tbody>
    )
  })}
    </table>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    rentingfrom: state.booking,
    listings: state.listing || {},
    rentingto: state.usersbookings
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)
