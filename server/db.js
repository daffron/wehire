
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

function checkForEmail (conn, email) {
  return conn('users')
  .select()
  .where('email', email)
}

function checkForUserName (conn, username) {
  return conn('users')
  .select()
  .where('user_name', username)
}
module.exports = {
  addUserToProfile,
  profileExists,
  checkForEmail,
  checkForUserName
}
