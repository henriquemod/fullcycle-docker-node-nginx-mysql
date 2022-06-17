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
  let people = [];
  const connection = mysql.createConnection(config);
  const createTableSql = `create table if not exists people(id INT NOT NULL AUTO_INCREMENT,name VARCHAR(255) NOT NULL,PRIMARY KEY ( id ));`;
  connection.query(createTableSql);
  const insert = `INSERT INTO people(name) values('Henrique')`;
  connection.query(insert);
  connection.query(
    {
      sql: "SELECT * FROM `people` WHERE `name` = ?",
      timeout: 40 * 1000,
      values: ["Henrique"],
    },
    (_, results) => {
      if (results) {
        for (let i = 0; i < results.length; i++) {
          people = people + `<li>${results[i].name}</li>`;
        }
      }
      res.send(`
      <h1>Full Cycle</h1>
      <ul>
        ${people}
      </ul>
      `);
    }
  );

  connection.end();
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
