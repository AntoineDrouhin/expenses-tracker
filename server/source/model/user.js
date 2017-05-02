const mongoose = require('mongoose')

const userModel = mongoose.model('User', mongoose.Schema({
  email: {type : String, required : true},
  password: {type : String, required : true},
  session: String
})
,'User')

module.exports = userModel
