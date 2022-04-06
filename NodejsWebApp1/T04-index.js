//T04. 使用 Express.js 網頁框架
//Client測試網址: http://localhost:1337
var express = require("express");
var app = express();//Creates an Express application.

//路由 "HTTP GET 請求方法 + 根路徑(/)" 至對應「中介軟體函數」
//app.get(): Routes HTTP GET requests to the specified path with the specified callback functions.
app.get("/", function (req, res) {
    res.send("Hello World 哈囉世界..."); 
});

//Binds and listens for connections on the specified port.
app.listen(1337, function () { console.log("Server listening on port 1337"); });

