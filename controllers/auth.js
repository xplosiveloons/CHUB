require('dotenv').config()

const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors/bad-request')
const { UnauthenticatedError } = require('../errors/unauthenticated')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {

  const { username, email, password } = req.body

  // Using the encrypted password to fill out the password field
  const tempUser = { username, email, password }

  // Sending the modified user details over for a new user to be created
  // in the database
  const user = await User.create({ ...tempUser })

  const token = await user.generateToken();
  res.status(StatusCodes.CREATED).json({ token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide a valid Cornell email and password.')
  }

  const user = await User.findOne({ email })

  // Check that the email is valid
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // Validate password
  if (!await user.checkPassword(password)) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.generateToken();
  res.status(StatusCodes.OK).json({ token })
}

module.exports = {
  register, login,
}

