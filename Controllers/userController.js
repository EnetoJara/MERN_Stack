'use strict'

function test (req, res) {
  return res.json({ message: 'users works' })
}

module.exports = {
  test
}