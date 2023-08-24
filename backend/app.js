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

// endoints: anything food related /food
const foodRoute = require("./routes/foodRoute");
foodRoute.setDb(db);
app.use(foodRoute.foodRouter);

// endpoint: search for a recipe /search
const searchRoute = require("./routes/searchRoute");
searchRoute.setDb(db);
app.use(searchRoute.searchRouter);

// endpoint: hero recipe /random
const randomRoute = require("./routes/randomRoute");
randomRoute.setDb(db);
app.use(randomRoute.randomRouter);

// start server
const port = 3000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));
