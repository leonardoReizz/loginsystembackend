var mysql = require("mysql");
require('dotenv').config();


const con = mysql.createConnection({
    host: "189.17.218.10",
    port: "53306",
    user: "oltmanager",
    password: "LIB-100-lib",
    database : 'portloginsystem'
});
module.exports = con

