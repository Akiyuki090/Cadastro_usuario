const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const conn = require('../db/conn')


router.get("/", (req, res) => {
  res.render("home");
});

router.post("/user/insertuser", (req, res) => {
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

router.get("/users", (req, res) => {
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

router.get("/users/:id", (req, res) => {
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

router.get("/users/edit/:id", (req, res) => {
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

router.post("/user/updateuser", (req, res) => {
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

router.post("/users/remove/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM infos WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/users");
  });
});

module.exports = router