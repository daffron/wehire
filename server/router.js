const express = require('express')
const request = require('superagent')
const bodyParser = require('body-parser')
const verifyJwt = require('express-jwt')

const auth = require('./lib/auth.js')
const jwt = require('jsonwebtoken')
const db = require('./db')

const router = express.Router()

router.use(bodyParser.json())

function getSecret (req, payload, done) {
  done(null, process.env.SECRET)
}

router.post('/auth', (req, res) => {
  jwt.verify(req.body.authToken, process.env.SECRET, (err, decoded) => {
    if (err) return res.json({error: err})
    db.getProfileByUserId(decoded.sub, (err, result) => {
      if (err) res.json({error: err})
      const user = {
        auth_id: decoded.sub,
        email: req.body.email
      }
      if (result) return res.status('200').json({firstLogin: false})
      db.addUserToProfile(user, (err, result) => {
        if (err) res.json({error: err})
        res.status('200').json({
          firstLogin: true
        })
      })
    })
  })
})

router.get('/categories', (req, res) => {
  db.getCategories((err, result) => {
    if (err) res.json({error: err})
    res.json(result)
  })
})

router.get('/locations', (req, res) => {
  db.getLocations((err, result) => {
    if (err) res.json({error: err})
    res.json(result)
  })
})

router.get('/listingssearch/:category/:term', (req, res) => {
  db.getListingsBySearch(req.params.category, req.params.term, (err, result) => {
    if (err) return res.json({error: err})
    if (result === null) {
      result = {
        error: 'No listings found'
      }
    }
    return res.json(result)
  })
})
router.use(
  verifyJwt({
    secret: getSecret
  }),
  auth.handleError
)
// Anything under here is protected
router.post('/newlisting', (req, res) => {
  const listing = req.body
  db.newListing(listing, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.get('/checkexistingemail/:email', (req, res) => {
  db.checkForEmail(req.params.email, (err, result) => {
    if (err) return res.json({error: err})
    res.json({exists: result})
  })
})

router.get('/checkexistingusername/:username', (req, res) => {
  db.checkForUserName(req.params.username, (err, result) => {
    if (err) res.json({error: err})
    res.json({exists: result})
  })
})

router.put('/myprofile/edit', (req, res) => {
  db.updateProfile(req.body.updated_profile, req.body.user_id, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/listing/:id/booking', (req, res) => {
  db.saveBookedDates(req.params.id, req.body.unavailableDates, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/newuserdetails', (req, res) => {
  const user = req.body
  user.buyer = true
  user.seller = true
  user.admin = false
  db.newUser(user, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.get('/checkcompleteuser/:id', (req, res) => {
  db.getProfileByUserId(req.params.id, (err, result) => {
    if (err) return res.json({error: err})
    if (result === undefined) return res.json({error: 'no users'})
    if (result.user_name) {
      return res.json({isComplete: true})
    }
    return res.json({isComplete: false})
  })
})

router.get('/getuserprofile/:id', (req, res) => {
  db.getProfileByUserId(req.params.id, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.get('/getlisting/:id', (req, res) => {
  db.getListingById(req.params.id, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

module.exports = router
