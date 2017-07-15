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

export function isUserComplete (userId, cb) {
  request('get', `/checkcompleteuser/${userId}`)
  .then(response => {
    cb(response.body.isComplete)
  })
}

export function saveToken (token, cb) {
  request('post', '/save-stripe-token', token)
  .then(response => {
    response.then(data => {
      cb(data)
    })
  })
}
