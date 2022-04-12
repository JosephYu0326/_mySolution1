let express = require('express');
let app = express();
app.listen(1337, function () {
    console.log(`Express Server listening on port 1337...`);
});

app.use("/", express.static(__dirname + '/public'));
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/login", function (req, res, next) {
    if (req.query.username == '捏小倩' && req.query.password == '令采臣') {
        res.render("template1.ejs", {
            title: `歡迎${req.query.username}`, today: new Date().toString(),
            nums: []

        });
    }
    else {
        res.redirect("t07-login-form.html");
    }
})






app.get('/template1', function (req, res, next) {

    res.render("template1.ejs", { title: 'Long Time No See!!!', today: '2022/04/07', nums: [10, 20, 30], total: 0 });
});








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