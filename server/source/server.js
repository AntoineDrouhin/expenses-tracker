require('dotenv').config()

const app = require('app')
const https = require('https')
const http = require('http')
const fs = require("fs");

const HTTP_PORT = process.env.HTTP_PORT
const HTTPS_PORT = process.env.HTTPS_PORT

if (!HTTP_PORT) {
  throw error("HTTP port is undefined")
}

if (!HTTPS_PORT) {
  throw error("HTTPS port is undefined")
}


/*
Notes Aurélien :
go to the server location path.
cd to keys
then :
:openssl genrsa 2048 > private.key
:openssl req -new -key private.key -out cert.csr
:openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

*/

// Declare key and certificate
const keyCert = {
  key: fs.readFileSync('keys/private.key'),
  cert: fs.readFileSync('keys/certificate.pem')
}

// Mount HTTPS server
var httpsServer = https.createServer(keyCert, app)
  .listen(HTTPS_PORT, function () {
    console.log('HTTPS Server listening on port ' + HTTPS_PORT);
});
// Mount HTTP server (disabled)
// var httpServer = http.createServer(app).listen(HTTP_PORT, function() {
//   console.log('HTTP Server listening on port ' + HTTP_PORT);
// })
