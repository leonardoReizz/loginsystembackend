const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const  con  = require("./db/connection");
const { connect } = require("./db/connection");
const { verify } = require("crypto");
const app = express();



    


app.use(cors());
app.use(bodyParser.json());


app.post("/login", async (req, res) =>{
    const {email, pass} = req.body;
    let sql = `SELECT * FROM users WHERE email = '${email}' and pass = '${pass}'`;
    con.query(sql, (err, results) => {
        if(err) res.status(404).json({err});
            return res.status(200).json(results)
    })
   
});

app.post("/register", async (req, res) => {
    const {fullName, email, pass} = req.body;
    if(!fullName) return res.status(400).json({msg: "Invalid fullname"});
    if(!email) return res.status(400).json({msg: "Invalid email"});
    if(!pass) return res.status(400).json({msg: "Invalid pass"});

    let sqlVerifyEmail = `SELECT * FROM users WHERE email = '${email}'`;
 
   
    con.query(sqlVerifyEmail, async (err, results) =>{
        if(err) throw new Error(err)
        if(results.length <= 0){
            let insertUser = `INSERT INTO users (fullName,email,pass) values ('${fullName}', '${email}', '${pass}')`;
            con.query(insertUser, (err, results) => {
                if(err) throw new Error(err)
                res.status(200).json(results)
            });   
        } else {
            res.status(400).json({msg: "Email Already Exists"})
        }
    });

})



app.listen(5050, console.log("Server Run"));