const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const mongoose = require('mongoose')
const mongodb_address = process.env.MONGODB_ADDRESS


if (!mongodb_address)
  throw 'ERROR : .env file must specify a MONGODB_ADDRESS field'

mongoose.connect(mongodb_address)

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

// Configuring Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
require('./config/passport.js')(passport, LocalStrategy)
const expressSession = require('express-session')
app.use(expressSession({secret: 'mySecretKey'}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Welcome to expenses-tracker API')
})

const expense = require('./route/expense.js')
app.use('/expense', expense)

const login = require('./route/login.js')
app.use('/login', login)

module.exports = app
