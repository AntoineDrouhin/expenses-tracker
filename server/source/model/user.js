const mongoose = require('mongoose')

const userModel = mongoose.model('User', mongoose.Schema({
  email: String,
  password: String,
  session: String
})
,'User')

module.exports = userModel
