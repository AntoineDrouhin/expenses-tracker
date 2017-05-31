
const utils = require('../service/utils')
const UserModel = require ('../model/user')
const UserTokenModel = require ('../model/userToken')

module.exports = function(passport, RememberMeStrategy){
  passport.use(new RememberMeStrategy(
    function(token, done) {
      console.log('REMEMBER ME STRATEGY => PARAMETER TOKEN', token)
      UserTokenModel.findOne({token: token}, function (err, userToken) {
        if (err) { return done(err) }
        if (!userToken) { return done(null, false) }
        console.log('REMEMBER ME STRATEGY => USERTOKEN FOUNDED', userToken)
        UserModel.findOne({_id : userToken.idUser}, (err, user) => {
          console.log('REMEMBER ME STRATEGY => USER FOUNDED', user)
          if (err) { return done(err) }
          if (!user) { return done(null, false) }
          return done(null, user)
        })
      })
    },
    function(user, done) {
      var token =  utils.randomString(64)
      console.log('REMEMBERME 2ND CALLBACK => USER ' + user )
      console.log('REMEMBERME 2ND CALLBACK => TOKEN ' + token )
      UserTokenModel.findOne({idUser: user._id},
        function (err, userToken) {
          console.log('REMEMBER ME STRATEGY 2ND CALLBACK => USERTOKEN ' + userToken)
          if (err) { return done(err) }
          if(!userToken) {
            console.log('NEW USERTOKEN :> token ' + token)
            console.log('NEW USERTOKEN :> user ' + user)
            userToken =  new UserTokenModel({
              token: token,
              idUser: user._id,
            })
          } else {
            userToken.token = token
          }
          console.log('REMEMBER ME STRATEGY 2ND CALLBACK => USERTOKEN ' + userToken)
          userToken.save(function (err) {
            if (err) { return done(err) }
            return done(null, token)
          })
        }
      )
    }
  ))
}
