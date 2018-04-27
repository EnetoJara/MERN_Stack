'use strict'

const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const server = express()
const userRoutes = require('./Routes/userRoute')
const profileRoutes = require('./Routes/profileRoute')
const postsRoutes = require('./Routes/postsRoute')
const passport = require('passport')

server.use(bodyParse.json({ limit: '15mb' }))
server.use(bodyParse.urlencoded({ extended: true }))
server.use(cors())
server.use(passport.initialize())
require('./Config/passport')(passport)
//use of routes
server.use('/api/users', userRoutes)
server.use('/api/posts', postsRoutes)
server.use('/api/profile', profileRoutes)


module.exports = server