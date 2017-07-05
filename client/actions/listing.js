import {RECEIVE_CATEGORIES, NEW_LISTING} from './variables'
import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'

const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

const newListing = listing => {
  return {
    type: NEW_LISTING,
    listing
  }
}

export function getCategories () {
  return dispatch => {
    dispatch(waiting())
    request('get', '/categories')
    .then(result => {
      dispatch(notWaiting())
      dispatch(receiveCategories(result.body))
    })
  }
}

export function createListing (listing) {
  return dispatch => {
    dispatch(waiting())
    request('post', '/newlisting', listing)
    .then(result => {
      dispatch(newListing(result))
      dispatch(notWaiting())
    })
  }
}
