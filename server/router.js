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
      if (result === undefined) {
        return res.status(200).send({
          firstLogin: false
        })
      }
      const user = {
        auth_id: decoded.sub,
        email: req.body.email
      }
      db.addUserToProfile(user, (err, result) => {
        console.log('ere')
        if (err) res.json({error: err})
        res.status('200').send({
          firstLogin: true
        })
      })
    })
  })
})

router.use(
  verifyJwt({
    secret: getSecret
  }),
  auth.handleError
)
// Anything under here is protected

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

module.exports = router
