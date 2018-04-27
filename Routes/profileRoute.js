'use strict'

const api = require('express').Router()
const controller = require('../Controllers/profileController')
const passport = require('passport')

api.get('/test', controller.test)
api.get('/', [ passport.authenticate('jwt', { session: false }), controller.currentUser ])
module.exports = api