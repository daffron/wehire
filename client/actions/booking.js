import {NEW_BOOKING, RECEIVE_BOOKINGS} from './variables'
import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'
import {error} from './error'

const newBooking = booking => {
  return {
    type: NEW_BOOKING,
    booking
  }
}

const receiveBookings = bookings => {
  return {
    type: RECEIVE_BOOKINGS,
    bookings
  }
}

export function getBookings (userId) {
  return dispatch => {
    dispatch(waiting())
    request('get', '/bookings')
    .then(result => {
      dispatch(notWaiting())
      dispatch(receiveBookings(result.body))
    })
  }
}

export function addBooking (listingId, userId, unavailableDates, bookedDates) {
  return dispatch => {
    dispatch(waiting())
    request('post', `/listing/${listingId}/booking`, {unavailableDates, booking: {listing_id: listingId, booked_user: userId, booked_dates: bookedDates}})
    .then(result => {
      if (result.error) return dispatch(error(result.error))
      dispatch(notWaiting())
    })
  }
}

