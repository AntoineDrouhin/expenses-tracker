const express = require('express')

const app = express()
const cors = require('cors')

const mongoose = require('mongoose')
const mongodb_address = process.env.MONGODB_ADDRESS
const bodyParser = require('body-parser')

if (!mongodb_address)
  throw 'ERROR : .env file must specify a MONGODB_ADDRESS field'

mongoose.connect(mongodb_address)

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to expenses-tracker API')
})

const expense = require('./route/expense.js')
app.use('/expense', expense)

const login = require('./route/login.js')
app.use('/login', login)


module.exports = app
