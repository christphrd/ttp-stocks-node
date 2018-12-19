var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allUsers = await models.User.findAll()
  res.send(allUsers);
});

module.exports = router;
