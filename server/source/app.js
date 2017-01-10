const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.send('\n\nHello, world!\n\n');
});

module.exports = app;
