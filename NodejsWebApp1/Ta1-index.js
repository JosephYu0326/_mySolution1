var express = require("express");
var app = express();//Creates an Express application.
//Binds and listens for connections on the specified port.
app.listen(1337, function () { console.log("Server listening on port 1337"); });

//裝載"express.static中介軟體函數"於"應用程式根目錄"
app.use('/', express.static(__dirname + '/public')); //例如 C:\_node\_workspace\_mySolution1\NodejsWebApp1 \public
//設定與樣版引擎相關之應用程式設定(Settings)
app.set('views', './views'); //設定樣版檔所在的目錄
app.set('view engine', 'ejs'); //設定要使用的樣版引擎
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
//Ta1. 在Express中存取MySQL資料庫 IV(以AJAX修改/刪除資料列) (改編自T13-index.js)
//Client測試網址:http://localhost:1337/ta1-ud_prod-ui
app.get("/ta1-ud_prod-ui", function (req, res, next) {
    //攫取使用者欲查詢的頁次
    let activePage = req.query.page ? req.query.page : 1; //預設activePage:1
    //設定每頁資料的筆數
    let rowsPerPage = 10;
    //設定「產品資料總筆數」與「分頁資料總頁數」之初始值
    let rowCount = 0, pageCount = 0;

    let sqlBase = `from products A, categories B
         where A.categoryid = B.categoryid`;
    //一次查詢動作包含2個SQL指令
    let sql = `select count(*) numOfRows ${sqlBase};
                select A.productid,A.productname,A.categoryid,B.categoryname,A.unitprice,A.unitsinstock
                ${sqlBase} order by productid limit ${(activePage - 1) * rowsPerPage}, ${rowsPerPage}`;
    //SQL指令如下：
    //select count(*) numOfRows from products A, categories B
    //where A.categoryid = B.categoryid;
    //select A.productid, A.productname, A.categoryid, B.categoryname, A.unitprice, A.unitsinstock
    //from products A, categories B
    //where A.categoryid = B.categoryid
    //order by productid limit 0, 10

    pool.query(sql, function (error, results, fields) {
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
        res.render('ta1-ud_prod-template.ejs',
            {
                pageCount: pageCount, activePage: activePage,  prods: results[1]
            });
    });
});
//本路由用於處理用戶端所發送的刪除商品資料列的AJAX請求  
app.get("/ta1-delprod", function (req, res, next) { 
    var productid = req.query.productid;
    var sql = `delete from products where productid=?`;
    pool.query(sql, [productid], function (err, results) {
        if (err) {
            console.log(err);
            res.send({ result: 'fail', errMsg: err.message }); //res,send()會先將「物件參數」轉成JSON格式的字串再送出
            return;
        }
        res.send({ result: 'success', rowCount: results.affectedRows });
    });   
});
//本路由用於處理用戶端所發送的修改商品資料列的AJAX請求  
app.get("/ta1-updprod", function (req, res, next) {
    var productid = req.query.productid;
    var productname = req.query.productname;    
    var categoryid = req.query.categoryid;
    var unitprice = req.query.unitprice;
    var unitsinstock = req.query.unitsinstock;
    var sql = 
        `update products set productname=?, categoryid=?, unitprice=?, unitsinstock=?
         where productid=?`; 
    pool.query(sql, [productname,categoryid,unitprice,unitsinstock,productid], function (err, results) {
        if (err) {
            console.log(err);
            res.send({ result: 'fail', errMsg: err.message }); //res,send()會先將「物件參數」轉成JSON格式的字串再送出
            return;
        }       
        res.send({ result: 'success', rowCount: results.affectedRows });
    });
});
//----------------------------------------------------------------------------------//