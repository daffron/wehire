const express = require('express')
const request = require('superagent')
const bodyParser = require('body-parser')
const verifyJwt = require('express-jwt')

const auth = require('./lib/auth.js')
const jwt = require('jsonwebtoken')
const db = require('./db')

const config = require('./../knexfile')[process.env.NODE_ENV || 'development']
const conn = require('knex')(config)


const router = express.Router()

router.use(bodyParser.json())

function getSecret (req, payload, done) {
  done(null, process.env.SECRET)
}

router.post('/auth', (req, res) => {
  jwt.verify(req.body.authToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
    }
    db.profileExists(conn, decoded.sub)
      .then((exists) => {
    console.log(decoded.sub, exists)
        if (exists.length !== 0) {
          return res.status(200).send({
            firstLogin: false
          })
        }
        db.addUserToProfile(conn, decoded.sub, req.body.user, req.body.email)
          .then((result) => {
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
//Anything under here is protected

router.get('/checkexistingemail/:email', (req, res) => {
  db.checkForEmail(conn, req.params.email)
  .then(result => {
    if (result[0]) {
    return res.json({exists: true})
    } 
    res.json({exists: false})
  })
})

router.get('/checkexistingusername/:username', (req, res) => {
  db.checkForUserName(conn, req.params.username)
   .then(result => {
    if (result[0]) {
    return res.json({exists: true})
    } 
    res.json({exists: false})
  })
})

module.exports = router