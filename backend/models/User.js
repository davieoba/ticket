const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: 2,
    maxlength: 54,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'A user must have an email address'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (val) {
        return validator.isEmail(val)
      },
      message: 'enter a valid email address'
    }
  },
  password: {
    type: String,
    minlength: 6,
    trim: true,
    lowercase: true
  },
  passwordConfirm: {
    type: String,
    minlength: 6,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (val) {
        return this.password === val
      },
      message: 'password are not equal'
    }
  },
  passwordChangedAt: Date
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

userSchema.methods.passwordChangedAfter = function (val) {
  if (this.passwordChangedAt) {
    return val < this.passwordChangedAt.getTime() / 1000
  }
  return false
}

userSchema.methods.comparePassword = function (val) {
  return bcrypt.compare(val, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
