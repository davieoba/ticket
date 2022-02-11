const User = require('./../models/User')
const catchAsync = require('./../utils/catch-async')
const AppError = require('./../utils/app-error')
const jwt = require('jsonwebtoken')
require('dotenv').config({
  path: './../.env'
})

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  if (!user) return next(new AppError('Error creating user', '401'))
  const token = jwt.sign({ id: user._id }, process.env.JSON_TOKEN_KEY, {
    expiresIn: process.env.EXPIRES_IN
  })

  res.status(200).json({
    status: 'success',
    result: {
      user
    },
    token
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })
  if (!user)
    return next(
      new AppError(
        `You don't have an account, create an account to use the application`,
        '400'
      )
    )
  const auth = user.comparePassword(password)
  if (!auth) return next(new AppError('Email or password is incorrect', '400'))

  const token = jwt.sign({ id: user._id }, process.env.JSON_TOKEN_KEY, {
    expiresIn: process.env.EXPIRES_IN
  })

  res.status(200).json({
    status: 'success',
    result: {
      user
    },
    token
  })
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  //   console.log(token)
  if (!token) return next(new AppError('User is not logged in', '400'))

  const decoded = await jwt.verify(token, process.env.JSON_TOKEN_KEY)
  //   console.log(decoded)

  const user = await User.findById(decoded.id)
  if (!user) return next(new AppError('User does not exist', '404'))

  const auth = user.passwordChangedAfter(decoded.iat)
  if (auth)
    return next(
      new AppError(
        'The password was recently changed, please log in again',
        '400'
      )
    )

  req.user = user
  next()
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  // some code
  res.end()
})
