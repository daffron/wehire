import {RECEIVE_RENTINGTO_BOOKINGS} from '../actions/variables'

const userbookings = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RENTINGTO_BOOKINGS: {
      return action.bookings
    }
  }
  return state
}

export default userbookings
