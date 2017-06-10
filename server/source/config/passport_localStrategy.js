
const User = require('../model/user.js')
const passwordHash = require('password-hash')

module.exports = function(passport, LocalStrategy){
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function(email, password, done) {
    User.findOne({ 'email': email },function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' })
      }
      if (!passwordHash.verify(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user, { message: 'Correct password.' })
    })
  }))

  passport.serializeUser(function(user, cb) {
    cb(null, user._id)
  })

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if (err) { return cb(err) }
      cb(null, user)
    })
  })

}
