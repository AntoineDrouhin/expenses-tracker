const mongoose = require('mongoose')

const userTokenModel = mongoose.model('user_token', mongoose.Schema({
  token: {type : String, required : true},
  userId: {type : String, required : true}
})
,'user_token')

module.exports = userTokenModel
