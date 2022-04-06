//T14. 使用CORS套件處理「同源政策」資安問題
//Client測試網址:http://localhost:1337/t14-cors-1337.html

// 啟動Web Server I (port: 1337)
//----------------------------------------------------------------------------------//
var express = require("express");
var app = express();//Creates an Express application.
//Binds and listens for connections on the specified port.
app.listen(1337, function () { console.log("Server listening on port 1337"); });
//啟用「靜態檔案提供服務」
//裝載"express.static中介軟體函數"於"應用程式根目錄"
app.use(express.static(__dirname + '/public'));


// 啟動Web Server II (port: 1338)
//----------------------------------------------------------------------------------//
var app2 = express();//Creates an Express application.
//Binds and listens for connections on the specified port.
app2.listen(1338, function () { console.log("Server listening on port 1338"); });
//啟用CORS
//前置作業: 安裝cors套件 (npm install cors)
var cors = require('cors');
const corsOptions = {
    //白名單
    origin: [ //預設'*'
        'http://www.example.com', 
        'http://localhost:1337'
    ]
};
//A. 使用CORS套件處理CORS問題
app2.use(cors(corsOptions));
//app2.use(cors()); //使用預設設定

app2.get("/t14-cors-1338", function (req, res, next) {
    //B. 自行以程式設定CORS相關回應標頭
    //let reqOrigin = req.get("origin"); //req.get(field)：回傳指定的請求標頭名稱(不區分大小寫)的值。
    //res.set("access-control-allow-origin", reqOrigin); //res.set(field , value)：設定指定的回應標頭名稱之值。

    res.send(`Hello world!!!`);
});
