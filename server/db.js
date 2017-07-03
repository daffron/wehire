const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient

function getDatabase (cb) {
  MongoClient.connect(process.env.DATABASE_URI, (err, db) => {
    if (err) return cb(err)
    cb(null, db)
  })
}

function newUser (user, cb) {
  user.dateAdded = new Date()
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').save(user, (err, result) => {
      if (err) return cb(err)
      cb(null, result.ops[0])
    })
  })
}

function getProfileByUserId (authId, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').find().toArray((err, results) => {
      if (err) return cb(err)
      if (results.length < 1) return cb('no entries')
      const userDetails = results.find(user => user.auth_id === authId)
      return cb(null, userDetails)
    })
  })
}

function addUserToProfile (user, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').save(user, (err, result) => {
      if (err) return cb(err)
      cb(null, result.ops[0])
    })
  })
}

function checkForEmail (email, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').find().toArray((err, results) => {
      if (err) return cb(err)
      const matches = results.find(user => user.email === email)
      if (matches) return cb(null, true)
      return cb(null, false)
    })
  })
}

function checkForUserName (username, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').find().toArray((err, results) => {
      if (err) return cb(err)
      const matches = results.find(user => user.user_name === username)
      if (matches) return cb(null, true)
      return cb(null, false)
    })
  })
}

module.exports = {
  addUserToProfile,
  getProfileByUserId,
  checkForEmail,
  checkForUserName,
  newUser
}
