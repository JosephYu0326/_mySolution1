'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

let server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end('<h1>Hello World 歡迎光臨</h1>');
});


server.listen(port, function () {
    console.log(`server listening on port ${port}...`);
});
