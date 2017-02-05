const mongoose = require('mongoose')

const userModel = mongoose.model('User', mongoose.Schema({
  email: String,
  password: String,
  session: String
})
)

module.exports = userModel
