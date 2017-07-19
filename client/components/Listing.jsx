import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {InputMoment} from 'react-input-moment'
import StripeCheckout from 'react-stripe-checkout'

import {getDuration, getDateArray} from '../utils/functions'
import {getListing} from '../actions/listing'
import {addBooking} from '../actions/booking'
import {saveToken} from '../utils/api'

class Listing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listingId: props.match.params.id,
      image: 0,
      mStart: moment(),
      mEnd: moment(),
      listing: props.listing,
      datesBooked: []
    }
    this.cycleImages = this.cycleImages.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
    this.duration = this.duration.bind(this)
    this.setDates = this.setDates.bind(this)
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

  onToken (token) {
    saveToken(token, response => {
      console.log(response)
    })
  }

  duration () {
    const multiplier = Math.abs(Math.floor(getDuration(this.state.mStart, this.state.mEnd) * Number(this.props.listing.price)))
    if (this.props.listing.perDay) {
      return multiplier / 24
    }
    return multiplier
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

  setDates (dates) {
    const unavailableDates = this.props.listing.unavailableDates
    const bookedDates = getDateArray(dates.mStart, dates.mEnd)
    this.setState({datesBooked: bookedDates})
    bookedDates.map(date => unavailableDates.push(date))
    this.props.addBooking(this.state.listingId, {unavailableDates,
      booking: {
        listing_name: this.props.listing.title,
        listing_id: this.state.listingId,
        booked_user: this.props.user.sub,
        booked_dates: bookedDates
      }
    })
  }

  render () {
    return (
      <div className='listing'>
        <div className='row'>
          <div className='col-sm-7 text-center'>
            {this.props.listing.images && <img src={this.props.listing.images[this.state.image]} />}
            <button onClick={this.cycleImages}>Next</button>
          </div>
          <div className='col-sm-5'>
            <p>{this.props.listing.title}</p>
            <p>{this.props.listing.description}</p>
            <h4>Book Now</h4>
              {this.props.listing && <div className='date-boxes'>
                <div className='date-wrapper'>
                  <InputMoment
                  moment={this.state.mStart}
                  onChange={this.handleStartDateChange}
                  taken={this.props.listing.unavailable_dates}
                  />
                </div>
                <div className='date-wrapper'>
                  <InputMoment
                  moment={this.state.mEnd}
                  onChange={this.handleEndDateChange}
                  taken={this.props.listing.unavailable_dates}
                  />
                </div>
              </div>
              }
            <p>Total Hire Cost: ${this.duration()}</p>
            <p>Deposit: ${Number(this.props.listing.deposit_amount)}</p>
            <p>Total: ${Number(this.props.listing.deposit_amount) + this.duration()}</p>
            <p>Days booked: {this.state.datesBooked.length || 0}</p>
              <StripeCheckout
              token={this.onToken}
              stripeKey='pk_test_FAaU6Ejp6b9entznne3IpZrO'
              amount={(Number(this.props.listing.deposit_amount) + this.duration()) * 100}
              />
            <button onClick={() => this.setDates(this.state)}>Book</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    listing: state.listing || {},
    user: state.auth.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getListing: id => dispatch(getListing(id)),
    addBooking: (listingId, userId, unavailableDates, bookedDates) => {
      dispatch(addBooking(listingId, userId, unavailableDates, bookedDates))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing)
