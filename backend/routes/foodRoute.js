const { Router } = require("express");
const foodRouter = Router();

let db;

const setDb = (database) => {
  db = database;
};

foodRouter.route("/food").get((req, res, next) => {
  if (!db) {
    res.status(500).send("Error, no database connection found.");
  }

  const recipes = [];

  // Note: Should probably not request all recipes all the time, but good for now
  db.all("SELECT * FROM recipes", (err, rows) => {
    if (err || !rows) {
      return res.status(500).send(`Error accessing database: ${err}`);
    }

    rows.forEach((r) => {
      recipes.push({
        id: r.id,
        title: r.title,
        description: r.description,
        img: r.img,
      });
    });

    res.status(200).json(recipes);
  });
});

foodRouter.route("/food/:id").get((req, res, _next) => {
  if (!db) {
    res.status(500).send("Error, no database connection found.");
  }

  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Error with ID");
  }

  db.get("SELECT * FROM recipes WHERE id = $id", { $id: id }, (err, row) => {
    if (err || !row) {
      return res.status(500).send(`Error accessing database: ${err}`);
    }

    res.status(200).json(row);
  });
});

module.exports = {
  foodRouter,
  setDb,
};
