const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(cors());

const dataPath = path.join(__dirname, "data");
const foodFile = path.join(dataPath, "recipes.json");
const foodString = fs.readFileSync(foodFile, "utf8");
const food = JSON.parse(foodString);

// endpoint: all recipes
app.route("/food").get((req, res, next) => {
  res.status(200).send(food);
});

// endpoint: single recipe by id
app.route("/food/:id").get((req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Error with ID");
  }

  const recipe = food.find((f) => f.id === id);

  if (!recipe) {
    return res.status(400).send(`No recipe found with ID ${id}`);
  }

  res.status(200).send(recipe);
});

// start server
const port = 3000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
