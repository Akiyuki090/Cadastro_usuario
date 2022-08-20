const mysql = require('mysql')
const dotenv = require("dotenv").config();

const conn = mysql.createConnection({
  host: "localhost",
  user: `${process.env.user}`,
  password: `${process.env.pas}`,
  database: "users",
});

module.exports = conn
