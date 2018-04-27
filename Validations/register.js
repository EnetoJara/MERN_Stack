'use strict'

const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput (data) {
  let errors = {}
  
  data.name = (isEmpty.isEmpty(data.name)) ? '' : data.name
  data.password = (isEmpty.isEmpty(data.password)) ? '' : data.password
  data.password2 = (isEmpty.isEmpty(data.password2)) ? '' : data.password2
  data.email = (isEmpty.isEmpty(data.email)) ? '' : data.email

  if (!validator.isLength(data.name, { min: 4, max: 15 })) errors.name = 'Name must be between 4 and 15 characters'
  if (validator.isEmpty(data.name)) errors.name = 'Name field is required'
  if (validator.isEmpty(data.email)) errors.email = 'Email field is required'
  if (!validator.isEmail(data.email)) errors.email = 'Email most be a valid email'
  if (validator.isEmpty(data.password)) errors.password = 'Password field is required'
  if (validator.isEmpty(data.password2)) errors.password2 = 'Confirm password field is required'
  if (!validator.isLength(data.password, { min: 6, max: 15 })) errors.password = 'Password must be at least 6 characters'
  if (!validator.equals(data.password, data.password2)) errors.password2 = 'Passwords must match'
  
  return {
    errors: errors,
    isValid: isEmpty.isEmpty(errors)
  }
}