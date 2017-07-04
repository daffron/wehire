import {RECEIVE_CATEGORIES} from '../actions/variables'

const categories = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categories
