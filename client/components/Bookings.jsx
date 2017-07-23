import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import Booking from './Booking'

class Bookings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bookings: props.bookings,
      modal: false
    }
  }

  rentingTo () {
    return (
      <div className='return-to'>
      <button> test </button>
      </div>
    )
  }

  render () {
    return (
      <div className='users-bookings'>
        <h3 className="text-center">My Bookings</h3>
        <h3>Renting from</h3>
        <table className='booking-table'>
          <tr>
            <th>User</th>
            <th>Listing Title</th>
            <th>Date From</th>
            <th>Date to</th>
          </tr>
      {this.props.rentingfrom.map((booking, i) => {
        return (
          <tbody key={i}>
              <tr>
                <td>{booking.user_name}</td>
                <td>{booking.listing_name}</td>
                <td>{moment(booking.booked_dates[0]).format('DD/MM/YYYY')} </td>
                <td>{moment(booking.booked_dates[booking.booked_dates.length - 1]).format('DD/MM/YYYY')}</td>
                <Booking bookingId={booking._id} returnDate={moment(booking.booked_dates[booking.booked_dates.length - 1]).format('DD/MM/YYYY')}/>
              </tr>
          </tbody>
        )
      })}
        </table>
        <h3>Renting To</h3>
        <table className='booking-table'>
          <tr>
            <th>User</th>
            <th>Listing Title</th>
            <th>Date From</th>
            <th>Date To</th>
          </tr>
      {this.props.rentingto.map((booking, j) => {
        return (
          <tbody key={j}>
              <tr>
                <td>{booking.user_name}</td>
                <td>{booking.listing_name}</td>
                <td>{moment(booking.booked_dates[0]).format('DD/MM/YYYY')} </td>
                <td>{moment(booking.booked_dates[booking.booked_dates.length - 1]).format('DD/MM/YYYY')}</td>
                <Booking bookingId={booking._id} />
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
    rentingfrom: state.rentingFromBookings,
    listings: state.listing || {},
    rentingto: state.rentingToBookings
  }
}

export default connect(mapStateToProps)(Bookings)
