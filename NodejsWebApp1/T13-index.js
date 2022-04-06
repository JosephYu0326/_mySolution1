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
            "title": `歡迎${req.body.username}蒞臨`,
            "today": new Date()
        });
    }
    else {
        //重新導向"登入畫面"
        res.redirect('t07-login-form.html');
    }
});
//----------------------------------------------------------------------------------//

//T08. 在Express中使用Multer套件處理檔案上傳
//Client測試網址: http://localhost:1337/t08-upload-form.html
//前置作業: 安裝multer套件 (npm install multer)
var multer = require('multer');
//法1 基本法
//var upload = multer({ dest: "uploads" }); //建議使用相對路徑
//法2 進階法
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); //建議使用相對路徑
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({
    "storage": storage,
    //過濾上傳的檔案 
    /*
    fileFilter: function (req, file, cb) {       
        if (file.mimetype !== 'image/png') {
            cb(null, false);
        }
        else {
            cb(null, true);
        }
    }
    */
});
app.post("/upload", upload.single('upload'), function (req, res, next) {
    // req.file is the `upload` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    console.log(req.body);
    /* 法一輸出結果如下:
    {
        fieldname: 'upload',
        originalname: 'Nancy.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'uploads/',
        filename: '73d8d9f10848cb9dc1e7cbf63028aa60',
        path: 'uploads\\73d8d9f10848cb9dc1e7cbf63028aa60',
        size: 9767
    }
    { date: '', name: '', phone: '', contacted_phone: '', message: '' }
    */
    /* 法二輸出結果如下:
    {
        fieldname: 'upload',
        originalname: 'Nancy.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'uploads/',
        filename: '1516519870849-Nancy.png',
        path: 'uploads\\1516519870849-Nancy.png',
        size: 9767
    }
    { date: '', name: '', phone: '', contacted_phone: '', message: '' }
    */
    //檢查Client端是否確實上傳了一個符合過濾條件的檔案?
    if (req.file != undefined)
        res.render("msg-template.ejs", { message: `${req.body.username}您好! 檔案(${req.file.originalname})上傳成功...`, imgurl: req.file.path });
    else
        //Client端未上傳檔案或檔案不符合過濾條件
        res.render("msg-template.ejs", { message: "您上傳無效的檔案，請重新執行...", imgurl: "" });
});

//啟用「靜態檔案提供服務」II
//Client上傳圖片檔後可立即在回應網頁中檢視儲存於Server上的對應圖片檔
app.use('/uploads', express.static(__dirname + '/uploads'));
//----------------------------------------------------------------------------------//

//T09. Express「路由」深入研究
//Client測試網址: 
//http://localhost:1337/user/kitty
//http://localhost:1337/abxxcd
//http://localhost:1337/aaabbb
//「字串」路由路徑
app.get('/user/:name', function (req, res, next) {
    //此路由路徑將符合傳送給 /user/aaa、/user/bbb 等等的請求。
    res.send(`<h1>歡迎 ${req.params.name} 光臨</h1>`);
    //req.params is an object containing properties mapped to the named route “parameters”(具名路由參數). 
    //For example, if you have the route /user /:name, then the “name” property is available as req.params.name.
    //This object defaults to { }.
});

//「字串型樣」路由路徑
app.get('/ab*cd', function (req, res, next) {
    //此路由路徑將符合傳送給 /abcd、/abxcd、/abxydc 等等的請求。
    res.send(`<h1>路由路徑含wildcard: ${req.path}</h1>`);
    //req.path: Contains the path part of the request URL.   
});

//「正規表示式」路由路徑
app.get(/abc/, function (req, res, next) {
    //只要路由名稱中有 “abc”，都與這個路由路徑相符。
    res.send(`<h1>路由路徑含'abc': ${req.path}</h1>`);
});
//----------------------------------------------------------------------------------//

//T10. 使用「express.Router函式」建立應用程式的子路由系統
//Client測試網址:http://localhost:1337/birds 或 http://localhost:1337/birds/info

//將"路由處理器模組(子路由系統/中介軟體函式)"載入應用程式中
var router = require('./T10-router.js');

//裝載"路由處理器模組(子路由系統/中介軟體函式)"在/birds路徑
app.use('/birds', router); //現在，應用程式就能夠處理發給 /birds 和 /birds/about 等HTTP 請求，並且呼叫該路由特定的 timeLog 中介軟體函式。

//T11. 在Express中使用Express-Session套件處理Session機制
//Client測試網址:http://localhost:1337/t11-session
//前置作業: 安裝express-session套件 (npm install express-session)
var session = require('express-session');
//裝載Session中介軟體於應用程式根目錄
app.use(session({ secret: "hellokitty", saveUninitialized: true, resave: true }));
//saveUninitialized resave屬性若不設定會產生如下警告:
//express-session deprecated undefined resave option; provide resave option T11-index.js:188:9
//express-session deprecated undefined saveUninitialized option; provide saveUninitialized option T11 - index.js: 188: 9
app.all('/t11-session', function (req, res, next) {
    if (req.session.authenticated) {
        res.render(
            'msg-template.ejs',
            {
                message: `歡迎 ${req.session.username} 光臨本網站...`,
                imgurl: "images/welcome.jpg"
            });
    }
    else {
        //重新導向"登入畫面"
        res.redirect('/t11-login-form.html');
    }
});
app.all('/t11-login', function (req, res, next) {
    var username = null, password = null;

    if (req.method == 'GET') {
        username = req.query.username;
        password = req.query.password;
    }
    else if (req.method == 'POST') {
        username = req.body.username;
        password = req.body.password;
    }

    if (username == '捏小倩' && password == '令采臣') {
        req.session.authenticated = true;
        req.session.username = username;
        res.redirect('/t11-session');
    }
    else {
        //重新導向"登入畫面"
        res.redirect('t11-login-form.html');
    }
});
//----------------------------------------------------------------------------------//

//T12. 在Express中存取MySQL資料庫 I (資料列基本CRUD作業)
//Client測試網址:http://localhost:1337/t12-emps-ui
app.get("/t12-emps-ui", function (req, res, next) {

    //A.-----建立資料庫連線-----//
    //A-1. 載入mysql套件
    var mysql = require('mysql');
    //A-2.建立並初始化Connection物件   
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306, //預設設定值: 3306
        user: 'root2', //使用者的驗證類型須使用標準模式(mysql_native_password)  (不支援MySQL 8.0起的"caching_sha2_password")
        password: 'root2',
        database: 'northwind'
    });
    //A-3. 透過Connection物件發送連線請求
    connection.connect(function (err) {
        if (err) {
            console.log(`資料庫連線失敗: ${err.message}`);
            res.status(403).end(); //回應用戶端: 403 Forbidden
            return;
        }
        console.log('資料庫連線成功... ');
        //A-4. 連線成功後即擷取員工資料列並回應用戶端
        fetchEmpsData(function (err, emps) {
            if (err)
                res.status(403).end(); //回應用戶端: 403 Forbidden
            else
                res.render('t12-emps-template.ejs', { emps: emps });   //回應客戶端「具員工清單的網頁」

            //A-5. 終止資料庫連線
            console.log('資料庫連線終止... ');
            connection.end();
        });
    });
    //B.-----擷取員工資料列-----//
    function fetchEmpsData(callback) {
        var sql = `select employeeid,firstname,lastname,title,
                   date_format(birthdate,'%Y/%m/%d') birthdate,
                   date_format(hiredate,'%Y/%m/%d') hiredate 
                   from employees`;
        //以SQL指令查詢資料庫資料
        connection.query(sql, function (error, results, fields) {
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            if (error) {
                console.log(error.message);
                callback(error, undefined);
            }
            else
                callback(undefined, results);

            //console.log(JSON.stringify(results));
            /* 輸出如下:
            [
            {"employeeid":1,"firstname":"Nancy","lastname":"Davolio","title":"Sales Representative","birthdate":"1948/12/08","hiredate":"1992/05/01"},
            {"employeeid":2,"firstname":"Andrew","lastname":"Fuller","title":"Vice President, Sales","birthdate":"1952/02/19","hiredate":"1992/08/14"},
            ...
            ]
            */
            //console.log(JSON.stringify(fields));
            /* 輸出如下:
             [
             {"catalog":"def","db":"northwind","table":"employees","orgTable":"employees","name":"employeeid","orgName":"employeeid","charsetNr":63,"length":11,"type":3,"flags":20483,"decimals":0,"zeroFill":false,"protocol41":true},
             {"catalog":"def","db":"northwind","table":"employees","orgTable":"employees","name":"firstname","orgName":"firstname","charsetNr":33,"length":30,"type":253,"flags":4097,"decimals":0,"zeroFill":false,"protocol41":true},
             ...
             {"catalog":"def","db":"","table":"","orgTable":"","name":"hiredate","orgName":"","charsetNr":33,"length":30,"type":253,"flags":0,"decimals":31,"zeroFill":false,"protocol41":true}
             ]
             */
        });
    }
});
//----------------------------------------------------------------------------------//
//*******************************//
//建立連線池
var pool = require('mysql').createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root2',
    password: 'root2',
    database: 'northwind',
    connectionLimit: 10, //允許的最大資料庫連線數目(Default: 10)
    multipleStatements: true //啟用Multiple statement查詢
});
//*******************************//

//T13. 在Express中存取MySQL資料庫 II (進階的CRUD作業)
//Client測試網址:http://localhost:1337/t13-prods-ui
app.get("/t13-prods-ui", function (req, res, next) {    
    //攫取使用者欲查詢的起產品類別編號
    let startCatId = req.query.startCatId ? req.query.startCatId : 1;
    //攫取使用者欲查詢的迄產品類別編號
    let endCatId = req.query.endCatId ? req.query.endCatId : 8;
    //攫取使用者欲查詢的頁次
    let activePage = req.query.page ? req.query.page : 1; //預設activePage:1
    //設定每頁資料的筆數
    let rowsPerPage = 10;
    //設定「產品資料總筆數」與「分頁資料總頁數」之初始值
    let rowCount = 0, pageCount = 0;
    
    let sqlBase = `from products A, categories B
         where A.categoryid = B.categoryid
         and A.categoryid between ? and ?`;
    //一次查詢動作包含2個SQL指令
    let sql = `select count(*) numOfRows ${sqlBase}; 
                select A.productid,A.productname,A.categoryid,B.categoryname,A.unitprice,A.unitsinstock
                ${sqlBase} order by productid limit ${(activePage - 1) * rowsPerPage}, ${rowsPerPage}`;
    //SQL指令如下：
    //select count(*) numOfRows from products A, categories B
    //where A.categoryid = B.categoryid
    //and A.categoryid between ? and ?;
    //select A.productid, A.productname, A.categoryid, B.categoryname, A.unitprice, A.unitsinstock
    //from products A, categories B
    //where A.categoryid = B.categoryid
    //and A.categoryid between ? and ? order by productid limit 0, 10

    pool.query(sql, [startCatId, endCatId, startCatId, endCatId], function (error, results, fields) {
        if (error) {
            console.log(error.toString());
            res.status(403).end(); //回應用戶端: 403 Forbidden
            return;
        }
        //results是一個陣列，它有兩個元素，分別代表相對應sql指令的查詢結果:
        console.log(results[0]);
        //例如：[ RowDataPacket { numOfRows: 77 } ]
        console.log(results[1]);
        /*例如：
        [
            RowDataPacket {productid: 1, productname: 'Chai', categoryid: 1, categoryname: 'Beverages', unitprice: 18, unitsinstock: 39},  
            (略)
            RowDataPacket {productid: 10, productname: 'Ikura', categoryid: 8, categoryname: 'Seafood', unitprice: 31, unitsinstock: 31}
        ]
        */

        //計算「產品資料總筆數」與「分頁資料總頁數」
        if (results[0][0].numOfRows > 0) {
            rowCount = results[0][0].numOfRows;  //rowCount即產品資料總筆數
            pageCount = Math.ceil(rowCount / rowsPerPage);  //pageCount即分頁資料總頁數
        }
        //產生一個網頁並回應給用戶端
        res.render('t13-prods-template.ejs',
            {
                pageCount: pageCount, activePage: activePage,
                prods: results[1], startCatId: startCatId, endCatId: endCatId
            });
    });
});
//----------------------------------------------------------------------------------//
