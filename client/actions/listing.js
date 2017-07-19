import {RECEIVE_CATEGORIES, NEW_LISTING, LISTING, RECEIVE_USERS_LISTINGS} from './variables'
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

export function getListing (id) {
  return dispatch => {
    dispatch(waiting())
    request('get', `/getlisting/${id}`)
    .then(result => {
      dispatch(listing(result.body[0]))
      dispatch(notWaiting())
    })
  }
}

export function getUsersListings (id) {
  return dispatch => {
    dispatch(waiting())
    request('get', `/userslistings/${id}`)
    .then(result => {
      dispatch(receiveUsersListings(result.body))
      dispatch(notWaiting())
    })
  }
}

const receiveUsersListings = listings => {
  return {
    type: RECEIVE_USERS_LISTINGS,
    listings
  }
}

function listing (result) {
  return {
    type: LISTING,
    result
  }
}
