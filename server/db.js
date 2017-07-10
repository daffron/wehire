const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient

function getDatabase (cb) {
  MongoClient.connect(process.env.DATABASE_URI, (err, db) => {
    if (err) return cb(err)
    cb(null, db)
  })
}

function getCategories (cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('categories').find().toArray((err, result) => {
      if (err) return cb(err)
      cb(null, result)
    })
  })
}

function getLocations (cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('locations').find().toArray((err, result) => {
      if (err) return cb(err)
      cb(null, result)
    })
  })
}

function newListing (listing, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('listings').save(listing, (err, result) => {
      if (err) return cb(err)
      cb(null, result.ops[0])
    })
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

function updateProfile (edit, authId, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').update({auth_id: authId}, {$set: edit}, (err, result) => {
      if (err) return cb(err)
      cb(null, result)
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

function getListingsBySearch (term, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('listings').find().toArray((err, results) => {
      if (err) return cb(err)
      const matches = []
      results.map(listing => {
        if (listing.title.includes(term) || listing.description.includes(term) || listing.category.includes(term)) {
          matches.push(listing)
        }
      })
      if (matches.length === 0) {
        matches.push({error: 'No results'})
      }
      return cb(null, matches)
    })
  })
}

module.exports = {
  addUserToProfile,
  getProfileByUserId,
  checkForEmail,
  checkForUserName,
  newUser,
  getCategories,
  getListingsBySearch,
  getLocations,
  newListing,
  updateProfile
}
