import Auth0Lock from 'auth0-lock'
import jwtDecode from 'jwt-decode'
const localStorage = global.window.localStorage

export default class AuthService {
  constructor (clientId, domain) {
    console.log(global.window)
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token'
      },
      languageDictionary: {
        title: ''
      },
      theme: {
        logo: '',
        primaryColor: '#14e241'
      }
    })
  }

  login () {
    this.lock.show()
  }

  logout () {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('user')
  }

  static getUser () {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(localStorage.user) : {}
  }

  static loggedIn () {
    const token = AuthService.getToken()
    return !!token && !AuthService.isTokenExpired(token)
  }

  static setUser (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  static setToken (idToken) {
    localStorage.setItem('id_token', idToken)
  }

  static getToken () {
    return localStorage.getItem('id_token')
  }

  static getTokenExpirationDate () {
    const token = AuthService.getToken()
    const decoded = jwtDecode(token)
    if (!decoded.exp) {
      return null
    }
    const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp)
    return date
  }

  static isTokenExpired () {
    const token = AuthService.getToken()
    if (!token) return true
    const date = AuthService.getTokenExpirationDate(token)
    const offsetSeconds = 0
    if (date === null) {
      return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }
}
