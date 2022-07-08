var mysql = require("mysql");
require('dotenv').config();


const con = mysql.createConnection({

    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database : 'portloginsystem'
});
console.log(process.env.MYSQL_HOST)
module.exports = con

