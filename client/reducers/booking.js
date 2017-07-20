import {RECEIVE_BOOKING} from '../actions/variables'

const booking = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BOOKING: {
      return action.booking
    }
  }
  return state
}

export default booking
