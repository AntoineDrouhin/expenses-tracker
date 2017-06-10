const express = require('express')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('config/winston_config')
const UserModel = require('./model/user.js')

const app = express()
const mailer = require('express-mailer')

const https = require('https')

mailer.extend(app, {
  from: process.env.MAIL_ADDRESS,
  host: process.env.MAIL_HOST_NAME, // hostname
  secureConnection: (process.env.MAIL_SECURE_CONNECTION === true || process.env.MAIL_SECURE_CONNECTION === 'true'), // use SSL
  port: process.env.MAIL_PORT, // port for secure SMTP
  transportMethod: process.env.MAIL_TRANSPORT_METHOD, // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASSWORD
  }
})

app.set('views', __dirname + '/mail')
app.set('view engine', 'jade')

// DataBase Configuration
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongodb_address = process.env.NODE_ENV == 'test' ?
  process.env.MONGODB_ADDRESS_TEST : process.env.MONGODB_ADDRESS

if (!mongodb_address) {
  throw 'ERROR : .env file must specify a MONGODB_ADDRESS field'
}

mongoose.connect(mongodb_address)

// Passport Configuration
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const RememberMeStrategy = require('passport-remember-me').Strategy
require('./config/passport_localStrategy.js')(passport, LocalStrategy)
require('./config/passport_rememberMeStrategy.js')(passport, RememberMeStrategy)

// Configure CORS
app.use(function(req, res, next){
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age' : '86400', // 24 hours
    'Access-Control-Allow-Headers' : 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  })
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  }
  else {
    next()
  }
})

app.use(cookieParser())
app.use(bodyParser.json())

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.sendStatus(401)
}

function ensureHuman(req, res, next) {
  var url = 'https://www.google.com/recaptcha/api/siteverify?secret='+ process.env.GCAPTCHA_SECRET_KEY+ '&response=' + req.body.tokenCaptcha
  if (req.body.tokenCaptcha) {
    https.get(url,function(resg) {
      var data = ''
      resg.on('data', function (chunk) {
        data += chunk.toString()
      })
      resg.on('end', function() {
        try {
          var parsedData = JSON.parse(data)
          console.log(parsedData)
          if(parsedData.success) {
            logger.info('ENSURE HUMAN : OK')
            return next()
          } else {
            logger.info('ENSURE HUMAN : NOK')
            res.sendStatus(401)
          }
        } catch (e) {
          logger.error('ENSURE HUMAN : INVALID GOOGLE RETURN')
          res.sendStatus(401)
        }

      })
    })
  }
  else {
    logger.info('ENSURE HUMAN : NO TOKEN IN BODY REQUEST')
    res.sendStatus(401)
  }
}

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('remember-me'))

app.get('/', (req, res) => {
  res.send('Welcome to expenses-tracker API')
})

app.get('/checkauth', ensureAuthenticated, (req, res) => {
  UserModel.findById(req.session.passport.user, function (err, user) {
    if (err) {
      logger.error(err)
      res.sendStatus(500)
    }
    res.send({
      _id: user._id,
      email: user.email,
      connected: true,
      error: false
    })
  })
})

const login = require('./route/login.js')
app.use('/login', ensureHuman, login)

const disconnect = require('./route/disconnect.js')
app.use('/disconnect', ensureAuthenticated, disconnect)

const expense = require('./route/expense.js')
app.use('/expense',ensureAuthenticated, expense)

const expenseType = require('./route/expenseType.js')
app.use('/expenseType',ensureAuthenticated, expenseType)

const user = require('./route/user.js')
app.use('/user', user)

module.exports = app
