
const express = require('express')
const router = express.Router()

const passport = require('passport')

router.post('/',passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect()
    // var obj = {"user": "toto"};
    // console.log(oxbj);
    console.log("console.log(req.user.username);");
    console.log(req.user.username);
    res.json(req.user.username);
  })


module.exports = router
