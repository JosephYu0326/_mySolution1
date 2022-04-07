let express = require('express');
let app = express();
app.listen(1337, function () {
    console.log(`Express Server listening on port 1337...`);
});

app.use("/",express.static(__dirname+'/public'));

app.get("/aaa", function (req, res, next) {
    res.send("<h1>Hello world 歡迎光臨</h1>");
    //res.end();
    next();
},
    function (req, res, next) {
        console.log("aaaaa");
        next();
});
app.all("/aaa", function (req, res, next) {
    ///res.send("<h1>您好</h1>");
    console.log("bbbbbbbb");
});