
const User = require('../model/user.js')

module.exports = function(passport, LocalStrategy){
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function(email, password, done) {
    console.log('test du user')
    console.log(email, password)
    User.findOne({ 'email': email },function (err, user) {
      console.log(err, user)
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' })
      }
      console.log('test password')
      if (password != user.password) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      console.log('Password ok')
      return done(null, user, { message: 'Correct password.' })
    })
  }))

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {
    cb(null, user.id)
  })

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if (err) { return cb(err) }
      cb(null, user)
    })
  })

}
