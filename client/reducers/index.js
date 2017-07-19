import {combineReducers} from 'redux'

import auth from './auth'
import waiting from './waiting'
import categories from './categories'
import locations from './locations'
import listingResults from './listingResults'
import getProfile from './user'
import error from './error'
import listing from './listing'
import booking from './booking'
import usersbookings from './usersbookings'

export default combineReducers({
  auth,
  waiting,
  listingResults,
  categories,
  locations,
  getProfile,
  error,
  listing,
  booking,
  usersbookings
})
