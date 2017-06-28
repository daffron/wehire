import request from 'superagent'

export const WAITING = "WAITING"

export function waiting () {
  return {
    type: WAITING
  }
}