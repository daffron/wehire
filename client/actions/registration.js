import request from '../utils/tokenApi'
import {waiting, notWaiting} from './index'

export const USER_ADDED = 'USER_ADDED'

export function newUser (user) {
  return dispatch => {
    dispatch(waiting())
    request('put', '/newuserdetails', user)
    .then(reply => {
      dispatch(userAdded(reply))
      dispatch(notWaiting())
    })
  }
}

function userAdded (reply) {
  return {
    type: USER_ADDED,
    reply
  }
}
