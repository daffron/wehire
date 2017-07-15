import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'
import {LISTING_RESULTS} from './variables'

export function search (term, category) {
  if (!term) {
    term = 'noterm'
  }
  return dispatch => {
    dispatch(waiting())
    request('get', `/listingssearch/${category}/${term}`)
    .then(results => {
      dispatch(listingResults(results.body))
      dispatch(notWaiting())
    })
  }
}

function listingResults (results) {
  return {
    type: LISTING_RESULTS,
    results
  }
}
