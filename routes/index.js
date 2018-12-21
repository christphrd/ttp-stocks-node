var express = require('express');
var router = express.Router();
var cors = require('cors');

const models = require('../models/index.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.options('/register', cors()) // enable pre-flight request for DELETE request
router.post('/register', async function(req, res, next) {
  let newAcc = await models.User.newAccount(req.body)
  newAcc.save()
  .then(saved => {
    let json = { status: 201, message: "Successfully created.", user: { email: saved.email, name: saved.name, account_balance: saved.account_balance }, token: null }
    res.json(json)
  })
  .catch(console.log)
})

module.exports = router;
