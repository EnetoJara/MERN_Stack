'use strict'

const mongoose = require('mongoose')
const Profile = require('../Models/Profile')
const User = require('../Models/User')

function test (req, res) {
  return res.json({ message: 'profile works' })
}

function currentUser (req, res) {
  let errors = {}
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user'
      return res.status(404).json(errors)
    }
    return res.json(profile)
  }).catch(err1 => res.status(500).json(err1))
}

module.exports = {
  currentUser, test
}