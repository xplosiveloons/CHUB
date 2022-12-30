require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "Please provide the username."],
    match: [/^[a-zA-Z0-9._%+-]+@cornell\.edu$/, "Please provide a valid Cornell email"],
    unique: true
  },
  points: {
    type: Number,
    default: 1
  },

  public: {
    type: Boolean,
    default: true
  },
  date_created: {
    type: Date,
    default: Date.now()
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 8
  }
})

UserSchema.pre('save', async function () {
  // encrypting the password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

/*
Generates the token to be sent back to user._. 
*/
UserSchema.methods.generateToken = function () {
  return (jwt.sign({ userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME, }))
};

UserSchema.methods.checkPassword = async function (testPassword) {
  const isMatch = await bcrypt.compare(testPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)