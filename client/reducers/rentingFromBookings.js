import {RECEIVE_RENTINGFROM_BOOKINGS} from '../actions/variables'

const rentingFromBookings = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RENTINGFROM_BOOKINGS: {
      return action.bookings
    }
  }
  return state
}

export default rentingFromBookings
