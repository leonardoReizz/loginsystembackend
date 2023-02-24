var mysql = require("mysql");
require('dotenv').config();


const con = mysql.createConnection({
    host: "ec2-54-233-166-196.sa-east-1.compute.amazonaws.com",
    port: "53010",
    user: "root",
    password: "pomodoro2023str",
    database : 'loginsystem'
});
module.exports = con

