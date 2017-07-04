import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS} from '../actions/variables'
import AuthService from '../utils/auth0'

const initialState = {
  isFetching: false,
  isAuthenticated: AuthService.loggedIn(),
  token: null,
  errorMessage: '',
  firstLogin: false,
  user: AuthService.getUser() || null
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: AuthService.getToken(),
        isFetching: false,
        isAuthenticated: true,
        firstLogin: action.firstLogin,
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        user: null,
        firstLogin: false
      }
    default:
      return state
  }
}
