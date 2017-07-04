import {WAITING, NOT_WAITING} from '../actions/variables'

const waiting = (state = false, action) => {
  switch (action.type) {
    case WAITING: {
      return true
    }
    case NOT_WAITING: {
      return false
    }
    default:
      return state
  }
}

export default waiting
