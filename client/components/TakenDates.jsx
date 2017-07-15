import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'
import {InputMoment} from 'react-input-moment'
import moment from 'moment'

class TakenDates extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      mStart: moment(),
      mEnd: moment()
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  handleOpen (e) {
    e.preventDefault()
    this.setState({modal: true})
  }

  handleStartDateChange (m) {
    this.setState({mStart: m})
    let date = m.format('MM/DD/YYYY')
    this.props.setDates(date)
  }

  handleEndDateChange (m) {
    this.setState({mEnd: m})
    let date = m.format('MM/DD/YYYY')
    this.props.setDates(date)
  }

  handleChange (date) {
    this.setState({date})
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
          <div className='date-wrapper'>
            <h4> Start </h4>
          <InputMoment
            moment={this.state.mStart}
            onChange={this.handleStartDateChange}
            taken={[]}
          />
          </div>
            <div className='date-wrapper'>
              <h4> End </h4>
          <InputMoment
            moment={this.state.mEnd}
            onChange={this.handleEndDateChange}
            taken={[]}
          />
          <button onClick={this.handleClose}> Save </button>
          </div>
            </ModalDialog>
          </ModalContainer>}
      </div>
    )
  }
}

export default TakenDates
