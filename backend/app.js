const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/cookbook.sqlite", (err) => {
  if (err) {
    console.log(`Error loading database: ${err}`);
  } else {
    console.log("Database opened successfully");
  }
});

// id, title, description, img
const recipeTable = "recipes";

// endpoint: all recipes
app.route("/food").get((req, res, next) => {
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
    db.close();
  });
});

// endpoint: single recipe by id
app.route("/food/:id").get((req, res, _next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Error with ID");
  }

  db.get("SELECT * FROM recipes WHERE id = $id", { $id: id }, (err, row) => {
    if (err || !row) {
      return res.status(500).send(`Error accessing database" ${err}`);
    }

    res.status(200).send(row);
  });
});

// start server
const port = 3000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
