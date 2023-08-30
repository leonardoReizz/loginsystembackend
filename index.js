const express = require("express");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();

dotenv.config()

app.use(cors(['https://loginsystem.leonardo-reis.com']));
app.use(bodyParser.json());

const db = new sqlite3.Database("local.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT,
    pass TEXT
  )`);
  

app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND pass = ?`;

    db.get(sql, [email, pass], (err, row) => {
        if (err) res.status(404).json({ err });
        return res.status(200).json(row);
    });
});

app.post("/register", async (req, res) => {
    const { fullName, email, pass } = req.body;
    if (!fullName || !email || !pass) {
      return res.status(400).json({ msg: "Invalid input" });
    }
  
    const sqlVerifyEmail = `SELECT * FROM users WHERE email = ?`;
  
    db.get(sqlVerifyEmail, [email], async (err, row) => {
      if (err) throw new Error(err);
      if (!row) {
        const insertUser = `INSERT INTO users (fullName, email, pass) VALUES (?, ?, ?)`;
  
        db.run(insertUser, [fullName, email, pass], (err) => {
          if (err) throw new Error(err);
          res.status(200).json({ msg: "User registered successfully" });
        });
      } else {
        res.status(400).json({ msg: "Email already exists" });
      }
    });
  });
  
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});