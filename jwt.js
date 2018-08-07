const jwt = require('jsonwebtoken')

function makeJWT() {
  return jwt.sign({ foo: 'bar' }, '123456')
}

function checkJWT(token) {
  try {
    jwt.verify(token, '123456')
    return true
  } catch (error) {
    return false
  }
}

module.exports = { makeJWT, checkJWT }
