import {RECEIVE_LOCATIONS} from './variables'
import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'

const receiveLocations = (locations) => {
  return {
    type: RECEIVE_LOCATIONS,
    locations
  }
}

export function getLocations () {
  return dispatch => {
    dispatch(waiting())
    request('get', '/Locations')
    .then(result => {
      dispatch(notWaiting())
      dispatch(receiveLocations(result.body))
    })
  }
}