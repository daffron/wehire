import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'
import {LISTING_RESULTS} from './variables'

export function search (term) {
  return dispatch => {
    dispatch(waiting())
    request('get', `/listingssearch/${term}`)
    .then(results => {
      dispatch(notWaiting())
      dispatch(listingResults(results.body))
    })
  }
}

function listingResults (results) {
  return {
    type: LISTING_RESULTS,
    results
  }
}
