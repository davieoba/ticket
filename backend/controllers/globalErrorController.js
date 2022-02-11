const sendErrorDev = (err, req, res) => {
  let statusCode = err.statusCode || 500
  let status = err.status || 'fail'

  res.status(statusCode).json({
    message: err.message,
    status: status,
    error: err,
    stacktrace: err.stack
  })
}

const sendErrorProd = (err, req, res, next) => {
  if (err.isOperational) {
    // some code
  } else {
    //
  }
}

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res)
  }
}
