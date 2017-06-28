import request from 'superagent'

import {waiting} from './index'
import {consume} from '../utils/api'

export function checkForExisting (input) {
  if (input.indexOf('@') > -1) {
    return dispatch => {
      dispatch(waiting())
      consume('get', '/checkexistingemail', input)
      .then(response => {
        return response
      })
    }
  } else {
    return dispatch => {
      dispatch(waiting())
      consume('get', '/checkexistingusername', input)
      .then(response => {
        return response
      })
    }
  }
}
