var express = require('express');
var router = express.Router();
var Transaction = require("../models").Transaction;

/* POST create transaction endpoint*/
router.post('/', async function (req, res, next) {
    console.log(req.headers)
    console.log(req.body)
});

module.exports = router;
