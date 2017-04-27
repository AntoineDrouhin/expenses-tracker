require('dotenv').config()

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
/*var httpsServer =*/ https.createServer(keyCert, app)
  .listen(HTTPS_PORT, function () {
    console.log('HTTPS Server listening on port ' + HTTPS_PORT)
  })

// Mount HTTP server (disabled)
// var httpServer = http.createServer(app).listen(HTTP_PORT, function() {
//   console.log('HTTP Server listening on port ' + HTTP_PORT);
// })
