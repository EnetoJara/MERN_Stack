'use strict'

const api = require('express').Router()
const controller = require('../Controllers/profileController')
// here is where we are going to put the middleware

api.get('/test', controller.test)

module.exports = api