const { Router } = require("express");
const randomRouter = Router();

let db;

const setDb = (database) => {
  db = database;
};

randomRouter.route("/api/random").get((req, res, _next) => {
  if (!db) {
    res.status(500).send("Error, no database connection found.");
  }

  db.get("SELECT * FROM recipes ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err || !row) {
      return res.status(500).send(`Error accessing database: ${err}`);
    }

    res.status(200).json(row);
  });
});

module.exports = {
  randomRouter,
  setDb,
};
