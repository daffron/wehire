import {GET_PROFILE} from '../actions/variables'

const getProfile = (state = [], action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.profile
  }
  return state
}

export default getProfile
