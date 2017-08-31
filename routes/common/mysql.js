var mysql=require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'w1701'
});

connection.connect();
module.exports=connection;