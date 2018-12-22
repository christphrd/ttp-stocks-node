var express = require('express');
var router = express.Router();
var cors = require('cors');

let usersRouter = require('./users');
let transactionsRouter = require('./transactions');

const User = require('../models/index.js').User;
const Transaction = require('../models/index.js').Transaction;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* REGISTER endpoint */
router.options('/register', cors()) // enable pre-flight request for POST request with custom headers
router.post('/register', cors(), async function(req, res, next) {
  let newAcc = await User.newAccount(req.body);

  newAcc.save()
  .then(saved => {
    let json = { status: 201, message: "Successfully created.", user: { email: saved.email, name: saved.name, account_balance: saved.account_balance }, token: saved.encodeToken() }
    res.status(201).json(json)
  })
  .catch(err => res.status(400).json({errors: err.errors[0].message}))
});

/* SIGNIN endpoint */
router.options('/signin', cors()) // enable pre-flight request for POST request with custom headers
router.post('/signin', cors(), async function (req, res, next) {
  const {email, password} = req.body;
  let signedIn = await User.checkUser(email, password);

  if (signedIn) {
    let json = { status: 200, message: "OK", user: { email: signedIn.email, name: signedIn.name, account_balance: signedIn.account_balance }, token: signedIn.encodeToken() }
    res.status(200).json(json)
  } else {
    res.status(401).json({ errors: "Sign in Failed. Please try again." })
  }
});

/* CURRENT_USER endpoint */
router.options('/current_user', cors())
router.get('/current_user', cors(), async function (req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  let currentUser = await User.decodeToken(token);
  if (currentUser) {
    let json = { status: 200, message: "OK", user: { email: currentUser.email, name: currentUser.name, account_balance: currentUser.account_balance } };
    res.status(200).json(json)
  } else {
    res.status(401).json({ message: "Please sign in." })
  }
});

/* TRANSACTIONS endpoint */
router.use('/transactions', transactionsRouter);

/* AUDIT endpoint */
router.options('/audit', cors())
router.get('/audit', cors(), async function(req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  let currentUser = await User.decodeToken(token);

  let transactionsList = await currentUser.getTransactions();

  res.status(201).json(transactionsList.reverse())
})

router.use('/users', usersRouter);

module.exports = router;
