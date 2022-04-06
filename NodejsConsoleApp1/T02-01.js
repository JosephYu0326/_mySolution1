var dateInfo = require('./dateInfo.js'); //dateInof.js 副檔名可省略
console.log("今天日期:%s", dateInfo.getDate());
console.log("現在時間:%s", dateInfo.getTime());

process.openStdin(); //強迫主控台視窗暫不關閉(按Ctrl+C可關閉視窗)
