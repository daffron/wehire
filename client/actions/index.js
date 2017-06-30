export const WAITING = 'WAITING'
export const NOT_WAITING = 'NOT_WAITING'

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
