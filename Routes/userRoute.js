'use strict'

const api = require('express').Router()
const controller = require('../Controllers/userController')
const passport = require('passport')

api.get('/test',[ passport.authenticate('jwt', ({ session: false })) ],  controller.test)
api.post('/register', controller.register)
api.post('/login', controller.logIn)

module.exports = api