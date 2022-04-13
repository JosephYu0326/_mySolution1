let express = require('express');
let router = express.Router();

router.use(function (req, res, next) {
    console.log(`現在時間:${Date.now()}`)
    next();
});
router.get("/", function (req, res, next) {

    res.send(`<h1>您已進入了${req.baseUrl} ${req.url}`);
})
router.get("/info", function (req, res, next) {

    res.send(`<h1>您已進入了${req.baseUrl} ${req.url}`);
})
router.get("/about", function (req, res, next) {

    res.send(`<h1>您已進入了${req.baseUrl} ${req.url}`);
})

module.exports = router;