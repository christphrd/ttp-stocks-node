var express = require('express');
var router = express.Router();
var User = require("../models").User;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allUsers = await User.findAll()
  res.send(allUsers);
});

module.exports = router;
