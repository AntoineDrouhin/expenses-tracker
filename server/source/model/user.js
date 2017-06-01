const mongoose = require('mongoose')

const userModel = mongoose.model('user', mongoose.Schema({
  email: {type : String, required : true},
  password: {type : String, required : true},
  session: String
})
,'user')

module.exports = userModel
