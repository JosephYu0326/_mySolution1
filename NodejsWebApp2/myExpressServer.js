let express = require('express');
let app = express();
app.listen(1337, function () {
    console.log(`Express Server listening on port 1337...`);
});

app.use("/", express.static(__dirname + '/public'));
app.use("/uploads", express.static(__dirname + '/uploads'));

app.set("views", "./views");
app.set("view engine", "ejs");

let multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

let session = require('express-session');
app.use(session({
    secret: 'abcde'
}));

app.get("/test-session", function (req, res,next) {
    if (req.session.authenticated) {
        res.render("msg-template.ejs", {
            message: `歡迎${req.session.username}光臨本網站...`,
            imgurl : "images/welcome.jpg"
        });
    }
    else {
        res.redirect("t11-login-form.html")
    }
})

app.get("/t11-login", function (req, res, next) {
    if (req.query.username == '捏小倩' && req.query.password == '令采臣') {
        req.session.authenticated = true;
        req.session.username = req.query.username;
        res.redirect("/test-session")
    }
    else {
        res.redirect("t11-login-form.html")
    }
});



let upload = multer({ "storage": storage });
app.post("/upload", upload.single('upload'), function (req,res,next) {
    if (req.file) {
        res.render("msg-template.ejs", {
            message: `${req.body.username}您好!檔案(${req.file.originalname})上傳成功...`,
            imgurl: req.file.path
        });
    }
    else {
        res.render("msg-template.ejs", {
            message: `您上傳無效的檔案...`,
            imgurl: ""
        });
    }
})

app.get("/emps/:empid", function (req, res, next) {

    res.send(`<h1>歡迎${req.params.empid}登入!</h1>`);
});

app.get(/0[1-9]-\d{7,8}$/, function (req, res, next) {

    res.send(`<h1>歡迎 path(${req.path})進入!</h1>`);
});

let regExp = /^0[1-9]-\d{7,8}$/;
console.log(`regExp.test("02-12345678") = ${regExp.test("02-12345678")}`);
//true
console.log(`regExp.test("a02-12345678") = ${ regExp.test("a02-12345678")}`);
//false 


let router = require('./my-router.js');
app.use("/birds",router)


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

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));


app.post("/login", function (req, res, next) {
    if (req.body.username == '捏小倩' && req.body.password == '令采臣') {
        res.render("template1.ejs", {
            title: `歡迎${req.body.username}`, today: new Date().toString(),
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