const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const Planet = require("./models/planet.js");
const app = express();
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /planets/new
app.get("/planet/new", (req, res) => {
  res.render("planet/new.ejs");
});

// POST /planet
app.post("/planet", async (req, res) => {
  if (req.body.hasRings === "on") {
    req.body.hasRings = true;
  } else {
    req.body.hasRings = false;
  }
  await Planet.create(req.body);
  res.redirect("/planet/new");
});

// GET /planets
app.get("/planet", async (req, res) => {
  const allPlanet = await Planet.find();
  console.log(allPlanet);
  res.render("planet/index.ejs", { planets: allPlanet });
});

app.get("/planet/:planetId", async (req, res) => {
  const foundPlanet = await Planet.findById(req.params.planetId);
  res.render("planet/show.ejs", { planet: foundPlanet });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
