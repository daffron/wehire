import {LISTING_RESULTS} from '../actions/variables'

const listingResults = (state = [], action) => {
  switch (action.type) {
    case LISTING_RESULTS:
      return action.results
  }
  return state
}

export default listingResults
