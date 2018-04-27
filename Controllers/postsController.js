'use strict'

function test (req, res) {
  return res.json({ message: 'posts works' })
}

module.exports = {
  test
}