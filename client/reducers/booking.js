import {NEW_BOOKING, RECEIVE_BOOKINGS} from '../actions/variables'

const booking = (state = {}, action) => {
  switch (action.type) {
    case NEW_BOOKING: {
      return action.booking
    } case RECEIVE_BOOKINGS: {
      return action.bookings
    }
  }
  return state
}

export default booking
