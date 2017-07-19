import {NEW_BOOKING, RECEIVE_BOOKINGS, RECEIVE_RENTINGTO_BOOKINGS} from './variables'
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
const receiveRentingToBookings = bookings => {
  return {
    type: RECEIVE_RENTINGTO_BOOKINGS,
    bookings
  }
}

export function getRentingFromBookings (userId) {
  return dispatch => {
    dispatch(waiting())
    request('get', `/bookings/${userId}`)
    .then(result => {
      dispatch(notWaiting())
      dispatch(receiveBookings(result.body))
    })
  }
}

export function getRentingToBookings (sellerId) {
  return dispatch => {
    dispatch(waiting())
    request('get', `/bookings/${sellerId}`)
    .then(result => {
      dispatch(notWaiting())
      dispatch(receiveRentingToBookings(result.body))
    })
  }
}

export function addBooking (listingId, booking) {
  return dispatch => {
    dispatch(waiting())
    request('post', `/listing/${listingId}/booking`, booking)
    .then(result => {
      if (result.error) return dispatch(error(result.error))
      dispatch(notWaiting())
    })
  }
}

