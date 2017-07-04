import AuthService from '../utils/auth0'

import {LOGOUT_SUCCESS} from './variables'

export function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logout () {
  const authService = new AuthService('WUpiRitE5dAmEz5SJN0DkyWX2BF61OHh',
  'wehire.au.auth0.com')

  return dispatch => {
    authService.logout()
    return dispatch(logoutSuccess())
  }
}
