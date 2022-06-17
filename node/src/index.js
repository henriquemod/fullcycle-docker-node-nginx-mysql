const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "fullcycle-docker",
};
const mysql = require("mysql");

app.get("/", (_, res) => {
  const connection = mysql.createConnection(config);
  const insert = `INSERT INTO people(name) values('Henrique')`;
  connection.query(insert);
  connection.query(
    {
      sql: "SELECT * FROM `people` WHERE `name` = ?",
      timeout: 40 * 1000,
      values: ["Henrique"],
    },
    (_, results) => {
      console.log(results);
      res.send(`<h1>Full Cycle</h1><br><h2>Ola ${results[0].name}</h2>`);
    }
  );

  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
