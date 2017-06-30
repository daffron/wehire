import AuthService from '../utils/auth0'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

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
