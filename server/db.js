
function addUserToProfile (conn, id, username, email) {
  return conn('users')
  .where('auth_id', id)
  .insert({
    auth_id: id,
    user_name: username,
    email: email
  })
}

function getProfileByUserId (conn, id) {
  return conn('users')
  .select()
  .where('auth_id', id)
}

function checkForEmail (conn, email) {
  return conn('users')
  .select('email')
  .where('email', email)
}

function checkForUserName (conn, username) {
  return conn('users')
  .select()
  .where('user_name', username)
}

function newUser (conn, user) {
  return conn('users')
  .where('email', user.email)
  .update(user)
}

module.exports = {
  addUserToProfile,
  getProfileByUserId,
  checkForEmail,
  checkForUserName,
  newUser
}
