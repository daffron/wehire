import {NEW_BOOKING} from '../actions/variables'

const booking = (state = {}, action) => {
  switch (action.type) {
    case NEW_BOOKING:
      return action.booking
  }
  return state
}

export default booking
