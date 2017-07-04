import {combineReducers} from 'redux'

import auth from './auth'
import waiting from './waiting'
import listingResults from './listingResults'

export default combineReducers({
  auth,
  waiting,
  listingResults
})
