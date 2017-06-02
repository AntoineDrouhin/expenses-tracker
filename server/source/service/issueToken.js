const utils = require('../service/utils')
const userTokenModel = require('../model/userToken')

function issueToken(user, done) {

  console.log('ISSUETOKEN => ISSUETOKEN : user '+ user)

  var token = utils.randomString(64)
  console.log('Token generé : ', token)
  console.log('userId : ', user._id)
  new userTokenModel({
    token: token,
    userId: user._id,
  })
    .save(function(err) {
      if (err) return done(err)
      return done(null, token)
    })
}

module.exports = issueToken
