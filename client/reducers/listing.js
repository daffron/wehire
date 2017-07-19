import {LISTING, RECEIVE_USERS_LISTINGS} from '../actions/variables'

const listing = (state = [], action) => {
  switch (action.type) {
    case LISTING: {
      return action.result
    }
    case RECEIVE_USERS_LISTINGS: {
      return action.listings
    }
  }
  return state
}

export default listing
