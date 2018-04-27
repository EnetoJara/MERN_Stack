'use strict'

const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput (data) {
  let errors = {}
  
  data.password = (isEmpty.isEmpty(data.password)) ? '' : data.password
  data.email = (isEmpty.isEmpty(data.email)) ? '' : data.email

  if (!validator.isEmail(data.email)) errors.email = 'Email most be a valid email'
  if (validator.isEmpty(data.email)) errors.email = 'Email field is required'
  if (validator.isEmpty(data.password)) errors.password = 'Password field is required'
  
  return {
    errors: errors,
    isValid: isEmpty.isEmpty(errors)
  }
}