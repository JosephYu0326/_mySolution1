let http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    res.end('<h1>歡迎光臨!!!!</h1>');
})

    .listen(1337, function () {
        console.log(`Web server listening on port 1337...`);
    });