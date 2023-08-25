const { Router } = require("express");
const searchRouter = Router();

let db;

const setDb = (database) => {
  db = database;
};

searchRouter.route("/api/search").get((req, res, _next) => {
  if (!db) {
    res.status(500).send("Error, no database connection found.");
  }

  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .send("No query found in request. Please use ?query=[searchterm] to initiate a search request.");
  }

  const sqlQuery = `SELECT * FROM recipes WHERE title LIKE "%${query}%" OR description LIKE "%${query}%"`;

  db.all(sqlQuery, (err, rows) => {
    if (err) {
      return res.status(500).send(`Error accessing database: ${err}`);
    }

    const results = [];

    rows.forEach((r) => {
      results.push({
        id: r.id,
        title: r.title,
        description: r.description,
        img: r.img,
      });
    });

    res.status(200).json(results);
  });
});

module.exports = {
  searchRouter,
  setDb,
};
