import {NEW_BOOKING} from './variables'
import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'
import {error} from './error'

const newBooking = booking => {
  return {
    type: NEW_BOOKING,
    booking
  }
}

export function addBooking (listingId, userId, unavailableDates, bookedDates) {
  return dispatch => {
    dispatch(waiting())
    request('put', `/listing/${listingId}/booking`, {unavailable_dates: unavailableDates, booking: {booked_user: userId, booked_dates: bookedDates}})
    .then(result => {
      if (result.error) return dispatch(error(result.error))
      dispatch(notWaiting())
      dispatch(newBooking(result))
    })
  }
}

