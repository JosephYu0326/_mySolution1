var express = require('express');
var router = express.Router();
router.use('/', function (req, res, next) {
    console.log(`time=${Date.now()}`);
    next();
})
router.get('/', function (req, res, next) {
    res.send('router root path');
})

module.exports = router;