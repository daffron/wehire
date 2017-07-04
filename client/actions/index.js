import {WAITING, NOT_WAITING} from './variables'

export function waiting () {
  return {
    type: WAITING
  }
}

export function notWaiting () {
  return {
    type: NOT_WAITING
  }
}
