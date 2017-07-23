import React from 'react'
import {connect} from 'react-redux'

import Modal from './Modal'
import {getBooking} from '../actions/booking'

class Booking extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      bookings: props.bookings,
      modal: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen (e) {
    e.preventDefault()
    this.props.getBooking(this.props.bookingId)
    this.setState({modal: true})
  }

  handleClose () {
    this.setState({modal: false})
  }

  render () {
    return (
    <div>
      <button className='date-modal' onClick = {this.handleOpen}>View</button>
      {this.state.modal &&
         <Modal />
      }
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    booking: state.booking
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getBooking: id => dispatch(getBooking(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking)

