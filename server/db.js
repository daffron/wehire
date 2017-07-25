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

function getListingsBySearch (category, term, cb) {
  if (term === 'noterm') {
    term = null
  }
  if (category === 'all') {
    category = null
  }
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('listings').find().toArray((err, results) => {
      if (err) return cb(err)
      const matches = []
      if (term && category) {
        results.map(listing => {
          if (listing.title.includes(term) || listing.description.includes(term) && listing.category == category) {
            matches.push(listing)
          }
        })
      } else if (term) {
        results.map(listing => {
          if (listing.title.includes(term) || listing.description.includes(term)) {
            matches.push(listing)
          }
        })
      } else {
        results.map(listing => {
          if (listing.category.includes(category)) {
            matches.push(listing)
          }
        })
      }
      if (matches.length === 0) {
        matches.push({error: 'No results'})
      }
      return cb(null, matches)
    })
  })
}

function getListingById (id, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('listings').find({_id: ObjectId(id)}).toArray((err, result) => {
      if (err) return cb(err)
      db.collection('users').find({auth_id: result[0].user_id}).toArray((err, res) => {
        if (err) return cb(err)
        result[0].user = res
        return cb(null, result)
      })
    })
  })
}

function getBookingById (id, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('bookings').find({_id: ObjectId(id)}).toArray((err, result) => {
      if (err) return cb(err)
      cb(null, result)
    })
  })
}

function getUsersListings (id, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('listings').find({user_id: id}).toArray((err, result) => {
      if (err) return cb(err)
      cb(null, result)
    })
  })
}

function getRentingFromBookings (id, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('bookings').find({booked_user: id}).toArray((err, result) => {
      if (err) return cb(err)
      cb(null, result)
    })
  })
}

function getRentingToBookings (id, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('bookings').find({seller_id: id}).toArray((err, result) => {
      if (err) return cb(err)
      cb(null, result)
    })
  })
}

function removeBooking (id, booking, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('history').save(booking, (err, result) => {
      if (err) return cb(err)
      db.collection('bookings').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return cb(err)
        cb(null, result)
      })
    })
  })
}

function newBooking (booking, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').find({auth_id: booking.booked_user}).toArray((err, result) => {
      booking.user_name = result[0].user_name
      if (err) return cb(err)
      db.collection('listings').find({_id: ObjectId(booking.listing_id)}).toArray((err, result) => {
        booking.seller_id = result[0].user_id
        if (err) return cb(err)
        db.collection('bookings').save(booking, (err, result) => {
          if (err) return cb(err)
          cb(null, result)
        })
      })
    })
  })
}

function saveUnavailableDates (listingId, unavailableDates, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('listings').update({_id: ObjectId(listingId)}, {$set: {unavailable_dates: unavailableDates}}, (err, result) => {
      if (err) return cb(err)
      cb(null, result)
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
  updateProfile,
  getListingById,
  newBooking,
  saveUnavailableDates,
  getRentingFromBookings,
  getRentingToBookings,
  getUsersListings,
  getBookingById,
  removeBooking
}
