//be sure to dispatch not waiting
import {ERROR} from './variables'

export function error (err) {
  return {
    type: ERROR,
    err
  }
}
