'use strict'

const User = require('../Models/User')
const gravatar = require('gravatar')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../Config/keys')
const validatorRegisterInput = require('../Validations/register')
const validatorLoginInput = require('../Validations/login')

function test (req, res) {
  return res.json({ message: 'users works' })
}

function register (req, res) {
  const { errors, isValid } = validatorRegisterInput(req.body)
  if (!isValid) return res.status(400).json(errors)
  User.findOne({ email: req.body.email }).then(stored => {
    if (stored) {
      errors.email = 'User Already exists'
      return res.status(400).json(errors)
    }
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'dd' })
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: avatar 
    })
    bcryptjs.genSalt(10, (err, salt) => {
      if (err) throw err
      bcryptjs.hash(newUser.password, salt, (err1, hash) => {
        if (err1) throw err1
        newUser.password = hash
        newUser.save().then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'ERROR SAVING USER' }))
      })
    })
  }).catch(err => res.status(500).json({ message: err }))
}

function logIn (req, res) {
  const { errors, isValid } = validatorLoginInput(req.body)
  if (!isValid) return res.status(400).json(errors)
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email: email }).then(stored => {
    if (!stored) {
      errors.email = 'User Not Found'
      return res.status(404).json(errors)
    }
    bcryptjs.compare(password, stored.password).then(isMatch => {
      if (!isMatch) {
        errors.password = 'Invalid Password'
        return res.status(400).json(errors)
      }
      const payload = { id: stored.id, name: stored.name, avatar: stored.avatar }
      jwt.sign(payload, config.secretKey, { expiresIn: 4600 }, (err2, token) => {
        if (err2) return res.status(500).json({ message: 'ERROR GETTING TOKEN' })
        else return res.json({ token: 'Bearer ' + token })
      })
    })
  }).catch(err => res.status(500).json({ message: err }))
}

module.exports = {
  test, register, logIn
}