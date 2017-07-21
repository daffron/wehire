import React from 'react'
import {connect} from 'react-redux'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

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
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h3>Booking</h3>
            </ModalDialog>
          </ModalContainer>
      }
    </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getBooking: id => dispatch(getBooking(id))
  }
}

export default connect(null, mapDispatchToProps)(Booking)

