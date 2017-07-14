import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

class TakenDates extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
        <button className='date-modal' onClick = {this.handleOpen}> Select Unavailable Dates </button>
      {this.state.modal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
            </ModalDialog>
          </ModalContainer>}
      </div>
    )
  }
}

export default TakenDates
