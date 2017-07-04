import {RECEIVE_LOCATIONS} from '../actions/variables'

const locations = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
      return action.locations
    default:
      return state
  }
}

export default locations
