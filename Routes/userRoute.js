'use strict'

const api = require('express').Router()
const controller = require('../Controllers/userController')
// here is where we are going to put the middleware

api.get('/test', controller.test)
api.post('/register', controller.register)
api.post('/login', controller.logIn)

module.exports = api