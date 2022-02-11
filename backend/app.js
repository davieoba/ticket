const express = require('express')
const userRoutes = require('./routes/user-routes')
const AppError = require('./utils/app-error')
const globalErrorController = require('./controllers/globalErrorController')

const app = express()
app.use(express.json())

app.use('/api/v1/users', userRoutes)

app.all('*', () => {
  next(new AppError('This route cannot be found', '404'))
})

app.use(globalErrorController)

module.exports = app
