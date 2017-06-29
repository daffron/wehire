import request from './tokenApi'

export function checkForExisting (input, cb) {
  if (input.indexOf('@') > -1) {
    request('get', `/checkexistingemail/${input}`)
      .then(response => {
        cb(response.body.exists)
      })
  } else {
    request('get', `/checkexistingusername/${input}`)
      .then(response => {
        cb(response.body.exists)
      })
  }
}
