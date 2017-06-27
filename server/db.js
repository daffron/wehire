const _ = require('lodash')

function addUserToProfile (conn, id, username, email) {
  return conn('users')
  .where('auth_id', id)
  .insert({
    auth_id: id,
    user_name: username,
    email: email
  })
}

function profileExists (conn, id) {
  return conn('users')
  .select()
  .where('auth_id', id)
}

module.exports = {
  addUserToProfile,
  profileExists
}
