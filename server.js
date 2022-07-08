const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const  con  = require("./db/connection");
const { connect } = require("./db/connection");
const { verify } = require("crypto");
const app = express();



    
app.listen(5050, console.log("Server Run"));


app.use(cors());
app.use(bodyParser.json());



