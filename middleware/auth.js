/**
 * Authentication middleware for all routes (except login) for checking 
 * that the requestor has the necessary authorization
 */

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors/unauthenticated')

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {
      userId: payload.userId, email: payload.email
    }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

module.exports = auth 