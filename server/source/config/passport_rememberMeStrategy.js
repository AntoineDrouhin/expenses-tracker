
const utils = require('../service/utils')
const UserModel = require ('../model/user')
const UserTokenModel = require ('../model/userToken')

module.exports = function(passport, RememberMeStrategy){
  passport.use(new RememberMeStrategy(
    function(token, done) {
      UserTokenModel.findOne({token: token}, function (err, userToken) {
        if (err) { return done(err) }
        if (!userToken) { return done(null, false) }
        UserModel.findOne({_id : userToken.userId}, (err, user) => {
          if (err) { return done(err) }
          if (!user) { return done(null, false) }
          return done(null, user)
        })
      })
    },
    function(user, done) {
      var token =  utils.randomString(64)
      UserTokenModel.findOne({userId: user._id},
        function (err, userToken) {
          if (err) { return done(err) }
          if(!userToken) {
            userToken =  new UserTokenModel({
              token: token,
              userId: user._id,
            })
          } else {
            userToken.token = token
          }
          userToken.save(function (err) {
            if (err) { return done(err) }
            return done(null, token)
          })
        }
      )
    }
  ))
}
