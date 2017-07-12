import {LISTING} from '../actions/variables'

const listing = (state = {}, action) => {
  switch (action.type) {
    case LISTING:
      return action.result
  }
  return state
}

export default listing
