var express = require('express');
var router = express.Router(); //傳回 a middleware that is specific to this router

router.use(function (req, res, next) { //timeLog middleware function
    console.log('Time: ', Date.now()); //輸出例如  Time: 1514773354922
    next();
});
// define the home page route
router.get('/', function (req, res) {
    console.log("req.baseUrl=%s; req.url=%s", req.baseUrl, req.url);
    //例如: req.baseUrl=/birds; req.url=/
    res.send('Birds home page');
});
// define the about route
router.get('/info', function (req, res) {
    console.log("req.baseUrl=%s; req.url=%s", req.baseUrl, req.url);
    //例如: req.baseUrl=/birds ; req.url=/info
    res.send('birds info page');
});

//匯出路由處理器模組
module.exports = router;
