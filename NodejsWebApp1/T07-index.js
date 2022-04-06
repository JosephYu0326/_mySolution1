//T04. 使用 Express.js 網頁框架
//Client測試網址: http://localhost:1337
var express = require("express");
var app = express();//Creates an Express application.
//Binds and listens for connections on the specified port.
app.listen(1337, function () { console.log("Server listening on port 1337"); });
//----------------------------------------------------------------------------------//

//T05. 在Express中支援「靜態檔案」
//Client測試網址: http://localhost:1337/mypage.html
//裝載"express.static中介軟體函數"於"應用程式根目錄"
app.use('/', express.static(__dirname + '/public')); //例如 C:\_node\_workspace\_mySolution1\NodejsWebApp1 \public
// 第一個參數: 虛擬路徑字首(Virtual path prefix)
//__dirname: 取得目前模組的目錄名稱
//----------------------------------------------------------------------------------//

//T06. 在Express中使用範本引擎
//Client測試網址: http://localhost:1337/template1
//前置作業: 安裝ejs套件 (npm install ejs)
//設定與樣版引擎相關之應用程式設定(Settings)
app.set('views', './views'); //設定樣版檔所在的目錄
app.set('view engine', 'ejs'); //設定要使用的樣版引擎
//建立路由，以渲染樣版檔
app.get('/template1', function (req, res, next) {
    var now = new Date();
    var today = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
    res.render("template1.ejs", {
        "title": "<歡迎光臨>",
        "today": today
    });
});
//----------------------------------------------------------------------------------/

//T07. 在Express中擷取GET與POST請求的參數 
//Client測試網址: http://localhost:1337/t07-login-form.html
//取得Get請求參數
app.get("/login", function (req, res, next) {
    if (req.query.username == '捏小倩' && req.query.password == '令采臣') {        
        
        res.render("template1.ejs", {
            "title": `歡迎${req.query.username}光臨`,
            "today": new Date()
        });
    }
    else {
        //重新導向"登入畫面"
        res.redirect('t07-login-form.html');
    }
});
//取得Post請求參數
//前置作業: 安裝body-parser套件 (npm install body-parser)
var bodyParser = require('body-parser');
//解析HTTP請求之Content-type="application/x-www-form-urlencoded"且Request's body內容為urlencoded Form Data
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", function (req, res, next) {
    console.log(req.body);

    if (req.body.username == '捏小倩' && req.body.password == '令采臣') {
        
        res.render("template1.ejs", {
            "title": `歡迎${req.body.username}蒞臨...`,
            "today": new Date()
        });
    }
    else {        
        //重新導向"登入畫面"
        res.redirect('t07-login-form.html');
    }
});
//----------------------------------------------------------------------------------//


