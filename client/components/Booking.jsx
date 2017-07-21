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

  componentDidMount () {
    this.props.getBooking(this.props.match.params.id)
  }

  handleOpen (e) {
    e.preventDefault()
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
              <h1>Booking</h1>
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

