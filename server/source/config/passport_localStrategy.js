
const User = require('../model/user.js')

module.exports = function(passport, LocalStrategy){
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function(email, password, done) {
    // console.log('test du user')
    // console.log(email, password)
    User.findOne({ 'email': email },function (err, user) {
      // console.log(err, user)
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' })
      }
      // console.log('test password')
      if (password != user.password) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      // console.log('Password ok')
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
