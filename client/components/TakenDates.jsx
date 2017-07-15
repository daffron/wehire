import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'
import {InputMoment} from 'react-input-moment'
import moment from 'moment'
import {getDateArray} from '../utils/functions'

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
    this.handleSave = this.handleSave.bind(this)
  }

  handleOpen (e) {
    e.preventDefault()
    this.setState({modal: true})
  }

  handleStartDateChange (m) {
    this.setState({mStart: m})
  }

  handleSave (e) {
    const dateArray = getDateArray(this.state.mStart, this.state.mEnd)
    this.props.setDates(dateArray)
  }

  handleEndDateChange (m) {
    this.setState({mEnd: m})
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
          <h4 className='text-center'> Start </h4>
          <div className='date-wrapper'>
          <InputMoment
            moment={this.state.mStart}
            onChange={this.handleStartDateChange}
            taken={this.props.dates}
          />
          </div>
            <h4 className='text-center'> End </h4>
            <div className='date-wrapper'>
            <InputMoment
              moment={this.state.mEnd}
              onChange={this.handleEndDateChange}
              taken={this.props.dates}
            />
          </div>
          <button onClick={this.handleSave}> Save </button>
            </ModalDialog>
          </ModalContainer>}
      </div>
    )
  }
}

export default TakenDates
