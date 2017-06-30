import {combineReducers} from 'redux'

import auth from './auth'
import waiting from './waiting'

export default combineReducers({
  auth,
  waiting
})
