import {REQUEST_CATEGORIES, RECEIVE_CATEGORIES} from './variables'
import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'

const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function getCategories () {
  return dispatch => {
    dispatch(waiting())
    request('get', '/categories')
    .then(result => {
      console.log(result.body)
      dispatch(notWaiting())
      dispatch(receiveCategories(result.body))
    })
  }
}

