const path = require('path')
const express = require('express')

const router = require('./router')
const server = express()

server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/v1/', router)

server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
