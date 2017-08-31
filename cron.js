var CronJob = require('work/cron').CronJob;
var process=require("child_process");

new CronJob('0 47 * * * *', function() {
    process.fork("./client.js");
}, null, true, 'Asia/Shanghai');