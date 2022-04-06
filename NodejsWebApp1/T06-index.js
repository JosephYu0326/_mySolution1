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


