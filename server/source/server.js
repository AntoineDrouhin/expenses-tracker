
require('dotenv').config()
const logger = require('./config/winston_config')

const app = require('app')
const https = require('https')
const fs = require('fs')

const HTTP_PORT = process.env.HTTP_PORT
const HTTPS_PORT = process.env.HTTPS_PORT

if (!HTTP_PORT) {
  throw 'HTTP port is undefined'
}

if (!HTTPS_PORT) {
  throw 'HTTPS port is undefined'
}

// Declare key and certificate
const keyCert = {
  key: fs.readFileSync('keys/private.key'),
  cert: fs.readFileSync('keys/certificate.pem')
}

// Mount HTTPS server
https.createServer(keyCert, app)
  .listen(HTTPS_PORT, function () {
    logger.info('= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =')
    logger.info('= = = =      ' + 'Server started and listening on port ' + HTTPS_PORT + '      = = = =')
    logger.info('= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =')
  })

module.exports = app
