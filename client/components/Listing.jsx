import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {InputMoment} from 'react-input-moment'

import {getDuration} from '../utils/functions'
import {getListing} from '../actions/listing'

class Listing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listingId: props.match.params.id,
      image: 0,
      mStart: moment(),
      mEnd: moment()
    }
    this.cycleImages = this.cycleImages.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.duration = this.duration.bind(this)
  }

  componentDidMount () {
    this.props.getListing(this.state.listingId)
  }

  handleStartDateChange (m) {
    this.setState({mStart: m})
  }

  handleEndDateChange (m) {
    this.setState({mEnd: m})
  }

  duration () {
    console.log(getDuration(this.state.mStart, this.state.mEnd))
  }

  cycleImages () {
    switch (this.state.image) {
      case 0:
        this.setState({image: 1})
        break
      case 1:
        this.setState({image: 2})
        break
      case 2:
        this.setState({image: 0})
    }
  }
  render () {
    return (
      <div className='listing'>
        <div className='row'>
          <div className='col-sm-8 text-center'>
            {this.props.listing.images && <img src={this.props.listing.images[this.state.image]} />}
            <button onClick={this.cycleImages}>Next</button>
          </div>
          <div className='col-sm-4'>
            <p>{this.props.listing.title}</p>
            <p>{this.props.listing.description}</p>
            <h4>Book Now</h4>
            <form>
              <p>From To</p>
              <div className='date-wrapper'>
                <InputMoment
                moment={this.state.mStart}
                onChange={this.handleStartDateChange}
                />
              </div>
              <div className='date-wrapper'>
                <InputMoment
                moment={this.state.mEnd}
                onChange={this.handleEndDateChange}
                />
              </div>
            </form>
            <p>Total: ${Math.abs(Math.floor(getDuration(this.state.mStart, this.state.mEnd) * Number(this.props.listing.price)) / 24)}</p>
            <button onClick={this.duration}>test</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    listing: state.listing || {}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getListing: id => dispatch(getListing(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
