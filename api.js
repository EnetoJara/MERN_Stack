'use strict'

const api = require('./server')
const http = require('http')
const mongoose = require('mongoose')
const config = require('./Config/keys')

const server = http.createServer(api)
const port = process.env.PORT || 3000

mongoose.connect(config.dbUrl)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR YnY'))
db.on('open', _ => {
  server.listen(port, err => {
    if (err) console.log(err)
    else console.log('SERVER RUNNING n.n ' + port)
  })
})