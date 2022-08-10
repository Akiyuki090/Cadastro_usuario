const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const dotenv = require("dotenv").config();

const app = express();
const port = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/user/insertuser", (req, res) => {
  const name = req.body.name;
  const cpf = req.body.cpf;
  const adress = req.body.adress;

  const sql = `INSERT INTO infos (name, cpf, adress) VALUES ('${name}', '${cpf}', '${adress}')`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.get("/users", (req, res) => {
  const sql = " SELECT * FROM infos";

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    const usuarios = data;
    console.log(usuarios);

    res.render("users", { usuarios });
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM infos WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    const usuario = data[0];
    console.log(usuario);

    res.render("user", { usuario });
  });
});

app.get("/users/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM infos WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    const usuario = data[0];
    console.log(usuario);

    res.render("edituser", { usuario });
  });
});

app.post("/user/updateuser", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const cpf = req.body.cpf;
  const adress = req.body.adress;

  const sql = `UPDATE infos SET name = '${name}', cpf = '${cpf}', adress = '${adress}' WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/users");
  });
});

app.post("/users/remove/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM infos WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/users");
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: `${process.env.user}`,
  password: `${process.env.pas}`,
  database: "users",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Conectou ao banco");
  app.listen(port);
  console.log(`Conectou na porta: ${port}`);
});
