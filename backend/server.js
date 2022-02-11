const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config({
  path: '.env'
})

const DB = process.env.MONGOOSE_URI

mongoose
  .connect(DB)
  .then(() => {
    console.log('database connected successfully')
  })
  .catch((err) => {
    console.log(err)
  })

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
