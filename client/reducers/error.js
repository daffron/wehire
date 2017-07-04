import {ERROR} from '../actions/variables'

const error = (state = {}, action) => {
  switch (action.type) {
    case ERROR:
      return action.error
  }
  return state
}

export default error
