const express = require("express");
const exphbs = require("express-handlebars");
const conn = require('./db/conn')
const router = require('./config/routes')

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

app.use(router)

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Conectou ao banco");
  app.listen(port);
  console.log(`Conectou na porta: ${port}`);
});
