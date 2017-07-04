import {combineReducers} from 'redux'

import auth from './auth'
import waiting from './waiting'
import categories from './categories'
import listingResults from './listingResults'
import getProfile from './user'
import error from './error'

export default combineReducers({
  auth,
  waiting,
  listingResults,
  categories,
  getProfile,
  error
})
