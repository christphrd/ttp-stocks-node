var express = require('express');
var router = express.Router();
var cors = require('cors');
var Transaction = require("../models").Transaction;
var User = require("../models").User;

/* POST create transaction endpoint*/
router.options('/', cors()); // enable pre-flight request for POST request with custom headers
router.post('/', cors(), async function (req, res, next) {
    const {ticker, quantity, price, account_balance} = req.body;
    //1. Authorized to make transaction?
    let token = req.headers.authorization.split(" ")[1];
    let currentUser = await User.decodeToken(token);

    //2. New transaction
    let newTransaction = Transaction.build({ticker: ticker, quantity: quantity, price: price, user_id: currentUser.id});

    //3. Check balance math
    let newBalance = (currentUser.account_balance - (quantity * price)).toFixed(2)
    let isBalanceAccurate = Number(newBalance) === Number(account_balance)

    //4. Persist to db and send response
    if (isBalanceAccurate) {
        let savedTran = await newTransaction.save()
        let updatedUser = await currentUser.update({account_balance: newBalance})
        res.status(201).json({transaction: savedTran, account_balance: updatedUser.account_balance})
    } else if (!isBalanceAccurate) {
        res.status(400).json({ errors: "Issue with account balance. Please refresh and try again." })
    } else {
        res.status(400).json({ errors: "Unknown error" })
    }
});

module.exports = router;
