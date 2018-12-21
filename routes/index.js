var express = require('express');
var router = express.Router();
var cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.options('/register', cors()) // enable pre-flight request for POST request
router.post('/register', cors(), async function(req, res, next) {
  console.log(req.body)
})

module.exports = router;
